var readExtDir = require('./readExtDir');
readExtDir(process.argv[2],process.argv[3], function(err,arr) {
	if (err) return err;
     	for (var i = 0; i < arr.length; i += 1) {
		console.log(arr[i]);
	}
});
