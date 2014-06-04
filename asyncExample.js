function walk() {
    console.log('Walk.');
    // This closure is only invoked after { walk(), run(), fly(); } sequence is done.
    setTimeout(function() {
        console.log('This is a closure initiated by walk().');
    }, 0);
    console.log('Walk done.');
};

function run() {
    console.log('Run.');
    // This initiates a system/kernel call.
    require('fs').readdir('.', function() {
        console.log('readdir(".") is done.');
    });
    console.log('Run done.');
};

function fly() {
    console.log('Fly.');
    // This initiates a system/kernel call.
    require('fs').readdir('/', function() {
        console.log('readdir("/") is done.');
    });
    console.log('Fly done.');
};

walk();
run();
fly();
