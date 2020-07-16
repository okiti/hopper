class music {
	constructor() {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
			this.playList = [];
		} catch (error) {
			alert('Web Audio Api is not supported in this browser');
		}
	}
	loadSound(url) {
		const request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
	
		request.onload = () => {
			this.context.decodeAudioData(request.response, (buffer) => {
				this.playList.push(buffer);
			}, onError);
		}
		request.send();
	}
	playSound(buffer) {
		var source = this.context.createBufferSource(); // creates a sound source
		source.buffer = buffer;                    // tell the source which sound to play
		source.connect(context.destination);       // connect the source to the context's destination (the speakers)
		source.start(0);                           // play the source now
																							 // note: on older systems, may have to use deprecated noteOn(time);
	}
}