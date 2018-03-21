'use strict';

class Music {
	constructor() {
		this.soundIcon = document.getElementById('sound');
		this.song = document.getElementById('internationale');
		this.soundIcon.addEventListener('click', this.onSoundClick.bind(this));
	}
	onSoundClick(e) {
		e.preventDefault();
		this.song.play();
	}
}

module.exports = Music;