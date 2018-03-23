'use strict';

class Music {
	constructor() {
		this.soundIcon = document.getElementById('sound');
		this.song = document.getElementById('internationale');
		if (this.soundIcon && this.song) {
			this.soundIcon.addEventListener('click', this.onSoundClick.bind(this));
		}
	}
	onSoundClick(e) {
		e.preventDefault();
		// Turn on/off sound
		if (e.target.classList.contains('off')) {
			e.target.classList.remove('off');
			e.target.classList.add('on');
			this.song.play();
		} else {
			e.target.classList.remove('on');
			e.target.classList.add('off');
			this.song.pause();
		}
	}
}

module.exports = Music;
