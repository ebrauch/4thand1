var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: './'});
});

var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});