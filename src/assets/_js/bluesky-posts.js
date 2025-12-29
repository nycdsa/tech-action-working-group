'use strict';

class BlueskyPosts {
	constructor() {
		this.container = document.querySelector('.bluesky-posts-container');
		
		if (this.container) {
			// Get handle from data attribute or fallback to default
			this.blueskyHandle = this.container.getAttribute('data-bluesky-handle') || 'nycdsatech.bsky.social';
			this.fetchPosts();
		}
	}

	async fetchPosts() {
		// Preserve the title
		const title = this.container.querySelector('.bluesky-posts-title');
		const titleHTML = title ? title.outerHTML : '<h2 class="bluesky-posts-title">Latest from Bluesky</h2>';
		
		// Show loading state
		this.container.innerHTML = titleHTML + '<div class="bluesky-loading">Loading posts...</div>';
		
		try {
			// Use Bluesky's public API endpoint
			// Note: This may require CORS proxy in production if CORS is not enabled
			const response = await fetch(
				`https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${this.blueskyHandle}&limit=5`,
				{
					method: 'GET',
					headers: {
						'Accept': 'application/json',
					}
				}
			);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			
			if (data.feed && data.feed.length > 0) {
				this.renderPosts(data.feed);
			} else {
				this.renderError('No posts found.');
			}
		} catch (error) {
			console.error('Error fetching Bluesky posts:', error);
			// If CORS error, suggest using a proxy
			if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
				this.renderError('Unable to load posts. CORS restrictions may apply. Consider using a server-side proxy.');
			} else {
				this.renderError('Unable to load posts at this time.');
			}
		}
	}

	formatDate(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffInSeconds = Math.floor((now - date) / 1000);
		
		if (diffInSeconds < 60) {
			return 'just now';
		} else if (diffInSeconds < 3600) {
			const minutes = Math.floor(diffInSeconds / 60);
			return `${minutes}m ago`;
		} else if (diffInSeconds < 86400) {
			const hours = Math.floor(diffInSeconds / 3600);
			return `${hours}h ago`;
		} else {
			const days = Math.floor(diffInSeconds / 86400);
			return `${days}d ago`;
		}
	}

	formatPostText(text) {
		// Convert URLs to links
		const urlRegex = /(https?:\/\/[^\s]+)/g;
		return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
	}

	renderPosts(posts) {
		const titleHTML = '<h2 class="bluesky-posts-title">Latest from Bluesky</h2>';
		this.container.innerHTML = titleHTML + posts.map((post, index) => {
			const record = post.post.record;
			const author = post.post.author;
			const createdAt = this.formatDate(record.createdAt);
			const text = this.formatPostText(record.text);
			const postUrl = `https://bsky.app/profile/${author.handle}/post/${post.post.uri.split('/').pop()}`;
			
			return `
				<div class="bluesky-post" data-index="${index}">
					<div class="bluesky-post-header">
						${author.avatar ? `<img src="${author.avatar}" alt="${author.displayName || author.handle}" class="bluesky-avatar">` : ''}
						<div class="bluesky-post-author">
							<strong>${author.displayName || author.handle}</strong>
							<span class="bluesky-post-handle">@${author.handle}</span>
							<span class="bluesky-post-time">${createdAt}</span>
						</div>
					</div>
					<div class="bluesky-post-content">
						${text}
					</div>
					<a href="${postUrl}" target="_blank" rel="noopener noreferrer" class="bluesky-post-link">View on Bluesky</a>
				</div>
			`;
		}).join('');
	}

	renderError(message) {
		const titleHTML = '<h2 class="bluesky-posts-title">Latest from Bluesky</h2>';
		this.container.innerHTML = titleHTML + `<div class="bluesky-error">${message}</div>`;
	}
}

module.exports = BlueskyPosts;

