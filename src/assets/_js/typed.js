'use strict';

const typedJS = require('typed.js');

class Typed {
	constructor() {
		let listItems = [].slice.call(document.querySelectorAll('.console li'));
		let i = listItems.length;
		for (let i = 0; i < listItems.length; i++) {
			let delay = 0;
			if (i > 0) {
				delay += listItems[i - 1].getAttribute('data-text').split('').length * 100;
			}
			if (i > 1) {
				delay += listItems[i - 2].getAttribute('data-text').split('').length * 100;
			}
			console.log(delay);
			setTimeout(() => {
				listItems[i].classList.add('active');
				new typedJS(listItems[i], {
					strings: [listItems[i].getAttribute('data-text')],
					typeSpeed: 50,
					autoInsertCss: true
				});
			}, delay);
		}
	}
}

module.exports = Typed;
