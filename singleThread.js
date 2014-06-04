function print(in) {
	console.log(in);
}
function sleep() {
	setTimeout(function(){
			console.log("wait!")
	}, 2000);
}
var i = 1;
while(i < 1000000) {
        print(i);
	sleep();
	i *= 2;
}
