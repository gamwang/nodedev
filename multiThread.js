var i = 1;
while(i < 1000000) {
	(function() {
		return setTimeout(function() {
			console.log('wait!');
			(function() {
                                        console.log(i);
                        })(); 
		}, 3000);
	})();
	i *= 2;
}
