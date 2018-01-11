'use strict';

const hello = require('./_js/test-module');

class Main {
	constructor() {
		hello();
	}
}

new Main();
