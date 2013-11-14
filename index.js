var fs = require('fs'), path = require('path');

function readFile(fd, buffer, ins, str) {

	fs.read(fd, buffer, 0, buffer.length, null, function (err, bytes, buf) {
		var s = buf.slice(0, bytes).toString(), i;

		while((i = s.indexOf('\n')) >-1) {
			str += s.substr(0, i);
			ins.emit('data', str);
			str = '';
			s = s.substr(i+1);
		}
		if (bytes === 0) { // end of file
			ins.emit('data', str);
			ins.emit('end');
			fs.close(fd);
		} else {
			str += s;
			readFile(fd, buf, ins, str);
		}
		
	});
}
function ReadFileByLine (fname, buffersize) {
	if (!fname) {
		throw new Error('filename is required.');
	}

	if (fname[0] !== '/') {
		fname = __dirname + '/' + fname;
	}
	fname = path.normalize(fname);

	if (!fs.existsSync(fname)) {
		throw new Error('file not exists.');
	}
	if (!fs.statSync(fname).isFile()) {
		throw new Error('Not a file');
	}
	var fd = fs.openSync(fname, 'r'),
		buffer = new Buffer(buffersize || 20);

	var that = this;
	process.nextTick(function () {
		readFile(fd, buffer, that, '');
	});

}
require('util').inherits(ReadFileByLine, require('events').EventEmitter);

module.exports = ReadFileByLine;




