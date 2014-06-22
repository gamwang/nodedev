var http = require('http')
var fs = require('fs');
var map = require('through2-map');
var url = require('url');

var parsedUrl;
var time;
var server = http.createServer(function (req, res) {
	if(req.method == 'GET') {
		parsedUrl = url.parse(req.url,true);	
		if (parsedUrl.pathname === '/api/parsetime') {
			if (parsedUrl.query.iso) {
				time = new Date(parsedUrl.query.iso);
				res.end(JSON.stringify({
					'hour': time.getHours(),
					'minute': time.getMinutes(),
					'second': time.getSeconds()
				}));
			}
		}
		if (parsedUrl.pathname === '/api/unixtime') {
			if (parsedUrl.query.iso) {
				time = new Date(parsedUrl.query.iso);
				res.end(JSON.stringify({
					"unixtime": time.getTime()
				}));
			}
		}
	}
});
server.listen(process.argv[2]);
