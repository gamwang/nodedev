var i = 1;
while(i < 1000000) {
	setTimeout(function(){
                        console.log(i + "wait!")
	i *= 2;
        }, 2000);
	console.log(i);	
}
