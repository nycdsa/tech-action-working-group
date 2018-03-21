'use strict';

// Greensock
// require('./../../node_modules/gsap/src/uncompressed/TweenLite.js');
// require('./../../node_modules/gsap/src/uncompressed/easing/EasePack.js');
// require('./../../node_modules/gsap/src/uncompressed/plugins/CssPlugin.js');
// require('./../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js');
// require('./../../node_modules/gsap/src/uncompressed/TimelineLite.js');

// All other modules
const example = require('./_js/example');
const scrollAnimations = require('./_js/scroll-animations');
const music = require('./_js/music');

class Main {
	constructor() {
		new scrollAnimations();
		new music();
		example();
	}
}

new Main();
