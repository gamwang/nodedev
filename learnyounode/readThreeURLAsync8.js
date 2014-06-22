var http = require('http');
var bl = require('bl');
var async = require('async');
/**
async.series([
function() {
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
},
function() {
	var blObj = new bl();
	var stream = http.get(process.argv[3],function(res) {
		res.setEncoding('utf8');
		res.on('data',function(data) {
			blObj.append(data.toString());
		});
		res.on('end',function(data) {
			console.log(blObj.toString('ascii').length);
			console.log(blObj.toString('ascii'));
		});
	});
},
function() {
	var blObj = new bl();
	var stream = http.get(process.argv[4],function(res) {
		res.setEncoding('utf8');
		res.on('data',function(data) {
			blObj.append(data.toString());
		});
		res.on('end',function(data) {
			console.log(blObj.toString('ascii').length);
			console.log(blObj.toString('ascii'));
		});
	});
}
]);
*/

/**
var blObj = new bl();
var stream = http.get(process.argv[2],function(res) {
	res.setEncoding('utf8');
	res.on('data',function(data) {
		blObj.append(data.toString());
	});
	res.on('end',function(data) {
		console.log(blObj.toString('ascii'));
		blObj = new bl();

        	var stream = http.get(process.argv[3],function(res) {
			res.setEncoding('utf8');
			res.on('data',function(data) {
				blObj.append(data.toString());
			});
			res.on('end',function(data) {
				console.log(blObj.toString('ascii'));
								
				blObj = new bl();
				var stream = http.get(process.argv[4],function(res) {
					res.setEncoding('utf8');
					res.on('data',function(data) {
						blObj.append(data.toString());
					});
					res.on('end',function(data) {
						console.log(blObj.toString('ascii'));
					});
				});
			});
		});
	});
});
*/

    var results = [];
    var count = 0;

    function printResults () {
      for (var i = 0; i < 3; i++)
        console.log(results[i]);
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err)
            return console.error(data);

          results[index] = data.toString();
          count++;

          if (count == 3) // yay! we are the last one!
            printResults();
        }));
      });
    }

    for (var i = 0; i < 3; i++)
      httpGet(i);
