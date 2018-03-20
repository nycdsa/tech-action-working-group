'use strict';

// Greensock
require('tween-lite');
require('ease-pack');
require('css-plugin');
require('scroll-to-plugin');
require('timeline-lite');

// All other modules
const example = require('./_js/example');
const scrollAnimations = require('./_js/scroll-animations');

class Main {
	constructor() {
		new scrollAnimations();
		example();
	}
}

new Main();
