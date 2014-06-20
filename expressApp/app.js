var express = require('express');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.get('/', function(req, res) {
    res.render(__dirname + '/views/index.jade');
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
