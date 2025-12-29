'use strict';

// All other modules
const scrollAnimations = require('./_js/scroll-animations');
const blueskyPosts = require('./_js/bluesky-posts');

class Main {
	constructor() {
		new scrollAnimations();
		new blueskyPosts();
	}
}

new Main();
