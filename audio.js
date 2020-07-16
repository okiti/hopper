class music {
	constructor() {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
			this.playList = [];
			this.source;
			this.started = false;
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
		this.source = this.context.createBufferSource();
		this.source.buffer = this.playList[0];
		this.source.connect(this.context.destination);
		this.source.start(0);
		this.started = true;
	}
	stopAudio() {
		this.source.stop(0);
	}
	play(url) {
		const mp3 = this.getAudio(url);
		document.addEventListener('click', () => {
			if (!this.started) {
				this.playAudio(mp3);
				this.started = true;
			} else {
				if (this.context.state === 'running') {
					this.context.suspend().then(() => {
						console.log('paused');
					})
				}else if (this.context.state === 'suspended') {
					this.context.resume().then(() => {
						console.log('playing')
					})
				}
			}
		});
	}
}

const burna = new music();
burna.play('https://naijaloaded.store/wp-content/uploads/2020/05/Mr-Eazi-I-No-Go-Give-Up-On-You.mp3?_=1');
