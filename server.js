var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var app = express();

mongoose.connect('mongodb://localhost/nfl');

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.render('index', {title: '4th and 1'});
});

var playersCtrl = require('./controllers/playersCtrl.js');

app.get('/api/totals', playersCtrl.getTotals);
app.get('/api/:player', playersCtrl.addPlayer);

var port = process.env.port || 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});