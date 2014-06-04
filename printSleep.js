function printNextPowerOfTwo(i) {
    if (i < 1e6) {
        i *= 2;
        console.log(i);
        setTimeout(function() {
            printNextPowerOfTwo(i);
        }, 1000);
    }
};

setInterval(function() {
    console.log('foooo');
}, 500);

printNextPowerOfTwo(1)