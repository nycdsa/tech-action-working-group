'use strict';

const CustomScrollAnimations = require('custom-scroll-animations');
const Animations = require('./_data/animations');

class ScrollAnimations {
	constructor() {
		const customScrollAnimations = new CustomScrollAnimations({
			className: '.scroll-trigger',
			animations: Animations
		});
	}
}
module.exports = ScrollAnimations;
