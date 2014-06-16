stddev = require('./stddev.js').stddev;
function confidenceInterval(p, n, b) {
	std = stddev(p, n);
	return std * std / (n * p);
}
module.exports.ci = confidenceInterval;
