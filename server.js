var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/nfl');

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
    //res.sendFile('index.html', {root: './'});
    res.render('index', {title: '4th and 1'});
});



var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});