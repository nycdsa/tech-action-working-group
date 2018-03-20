'use strict';

const example = require('./_js/example');
const scrollAnimations = require('./_js/scroll-animations');

class Main {
	constructor() {
		new scrollAnimations();
		example();
	}
}

new Main();
