function stddev (p,n) {
	return Math.sqrt(n * p * (1 - p)) / n;
}
module.exports.stddev = stddev;
