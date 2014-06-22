var net = require('net');
function zeroFill(i) {
      return (i < 10 ? '0' : '') + i;
}
var server = net.createServer(function (socket) {
      // socket handling logic
      var time = new Date();
      socket.end(
	time.getFullYear() + '-' 
	+ zeroFill(time.getMonth() + 1)  +  '-'
	+ time.getDate() + ' '
	+ time.getHours() + ':'
	+ time.getMinutes() + '\n'
	);
});
server.listen(process.argv[2]);
