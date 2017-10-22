const { Duplex } = require('stream');

const inputStream = new Duplex({
	write(chunk, encoding, callback) {
		console.log(chunk.toString());
		callback();
	},

	read(size) {
		if(this.currentCharCode > 90) {
			this.push(null);
			return;
		}
		this.push(String.fromCharCode(this.currentCharCode++));
	}
});

inputStream.currentCharCode = 65;
process.stdin.pipe(inputStream).pipe(process.stdout);
