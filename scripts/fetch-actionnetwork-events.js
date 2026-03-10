#!/usr/bin/env node

/**
 * Fetches events from ActionNetwork API and writes them to src/_data/actionnetwork_events.json
 * Includes all events from 2026-01-01 onwards (including past events)
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ACTIONNETWORK_API_KEY;
const API_BASE = 'https://actionnetwork.org/api/v2';
const OUTPUT_FILE = path.join(__dirname, '../src/_data/actionnetwork_events.json');
const START_DATE = '2026-01-01'; // Include events from start of 2026

// If API key is missing, try to use existing data file
if (!API_KEY) {
	console.warn('WARNING: ACTIONNETWORK_API_KEY environment variable is not set');
	
	// Check if data file already exists
	if (fs.existsSync(OUTPUT_FILE)) {
		console.warn(`Using existing data file: ${OUTPUT_FILE}`);
		console.warn('To fetch fresh data, set ACTIONNETWORK_API_KEY environment variable');
		process.exit(0); // Exit successfully, using existing data
	} else {
		// No API key and no existing file - create empty array
		console.warn('No existing data file found. Creating empty events array.');
		console.warn('To fetch events, set ACTIONNETWORK_API_KEY environment variable');
		
		// Ensure output directory exists
		const outputDir = path.dirname(OUTPUT_FILE);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}
		
		// Write empty array
		fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf8');
		console.warn(`Created empty events file: ${OUTPUT_FILE}`);
		process.exit(0); // Exit successfully with empty data
	}
}

async function fetchAllEvents() {
	const allEvents = [];
	let nextPage = `${API_BASE}/events`;

	console.log('Fetching events from ActionNetwork...');

	while (nextPage) {
		try {
			const response = await fetch(nextPage, {
				headers: {
					'OSDI-API-Token': API_KEY,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`API request failed: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			const events = data._embedded?.['osdi:events'] || [];

			// Filter events from 2026-01-01 onwards
			const filteredEvents = events
				.filter(ev => {
					if (!ev.start_date) return false;
					const eventDate = new Date(ev.start_date);
					const startDate = new Date(START_DATE);
					return eventDate >= startDate;
				})
				.map(ev => ({
					id: ev.identifiers?.[0] || ev.id || '',
					title: ev.title || 'Untitled Event',
					description: ev.description || '',
					start: ev.start_date || null,
					end: ev.end_date || null,
					url: ev.browser_url || null,
					location: ev.location?.venue || ev.location?.address_lines?.[0] || null,
				}));

			allEvents.push(...filteredEvents);
			console.log(`  Fetched ${filteredEvents.length} events (total: ${allEvents.length})`);

			// Check for next page
			const nextLink = data._links?.['osdi:events']?.find(link => link.rel === 'next');
			nextPage = nextLink?.href || null;

			if (nextPage && !nextPage.startsWith('http')) {
				nextPage = `${API_BASE}${nextPage}`;
			}
		} catch (error) {
			console.error('Error fetching events:', error.message);
			throw error;
		}
	}

	// Sort events by start date (oldest first)
	allEvents.sort((a, b) => {
		if (!a.start) return 1;
		if (!b.start) return -1;
		return new Date(a.start) - new Date(b.start);
	});

	return allEvents;
}

async function main() {
	try {
		const events = await fetchAllEvents();
		
		// Ensure output directory exists
		const outputDir = path.dirname(OUTPUT_FILE);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// Write events to file
		fs.writeFileSync(OUTPUT_FILE, JSON.stringify(events, null, 2), 'utf8');
		
		console.log(`\n✓ Successfully wrote ${events.length} events to ${OUTPUT_FILE}`);
		console.log(`  Events from ${START_DATE} onwards (including past events)`);
	} catch (error) {
		console.error('\n✗ Failed to fetch events:', error.message);
		process.exit(1);
	}
}

main();
