'use strict';

// All other modules
const scrollAnimations = require('./_js/scroll-animations');
const music = require('./_js/music');

class Main {
	constructor() {
		new scrollAnimations();
		new music();
	}
}

new Main();
