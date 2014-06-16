stddev = require('./stddev').stddev;
var percentage = 0.5;
console.log(stddev(percentage,10));
console.log(stddev(percentage,100));
console.log(stddev(percentage,1000));
console.log(stddev(percentage,10000));
console.log(stddev(percentage,100000));
console.log(stddev(percentage,1000000000));
