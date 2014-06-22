var http = require('http');
var bl = require('bl');

var blObj = new bl();

var stream = http.get(process.argv[2],function(res) {
        res.setEncoding('utf8');
        res.on('data',function(data) {
        	blObj.append(data.toString());
	});
	res.on('end',function(data) {
		console.log(blObj.toString('ascii').length);
		console.log(blObj.toString('ascii'));
	});
});
