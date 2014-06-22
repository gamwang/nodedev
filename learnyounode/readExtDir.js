var fs = require('fs');
var path = require('path');
function readFilterDir(dir,ext,cb) {
	var out = [];
	fs.readdir(dir, function(err, list) {
		if(err) return cb(err,list);
		for (var i = 0; i < list.length; i += 1) {
			if (path.extname(list[i]) === ('.' + ext)) {
				out.push(list[i]);
			}
		}
		cb(err,out);
	});
}
module.exports = readFilterDir;
