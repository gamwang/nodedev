stddev = require('./stddev').stddev;
ci = require('./confidenceInterval').ci;
var percentage = 0.24;
console.log(stddev(percentage,10));
console.log(stddev(percentage,100));
console.log(stddev(percentage,1000));
console.log(stddev(percentage,10000));
console.log(stddev(percentage,100000));
console.log(stddev(percentage,1000000000));

console.log(ci(percentage,10000,0.99));
