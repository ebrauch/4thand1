var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: './'});
})

var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
})