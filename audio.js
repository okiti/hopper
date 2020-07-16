class music {
	constructor() {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
			this.playList = [];
			this.playButton = document.querySelector('#play');
		} catch (error) {
			alert('Web Audio Api is not supported in this browser');
		}
	}
	getAudio(url) {
		window.fetch(url)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
			.then(audioBuffer => {
				return this.playList.push(audioBuffer);
			});
	}
	playAudio(playList) {
		const source = this.context.createBufferSource();
		source.buffer = this.playList[0];
		source.connect(this.context.destination);
		source.start();
	}
	play(url) {
		document.addEventListener('click', () => {
			const mp3 = this.getAudio(url);
			this.playAudio(mp3);
		});
	}
}

const burna = new music();
burna.play('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3');
