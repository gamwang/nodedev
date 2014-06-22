var http = require('http');

var stream = http.get(process.argv[2],function(res) {
	res.setEncoding('utf8');	
	res.on('data',function(data) {
		console.log('DATA: ' + data);
	});
	res.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		throw e;
	});
});

