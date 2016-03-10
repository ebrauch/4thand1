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

var playersCtrl = require('./controllers/playersCtrl.js');

app.get('/api/rec/:playerID', playersCtrl.getRecData);
app.get('/api/rush/:playerID', playersCtrl.getRushData);
app.get('/api/pass/:playerID', playersCtrl.getPassData);
app.get('/api/def/:team', playersCtrl.getDef);
app.get('/api/defPassStats/:team', playersCtrl.getDefPassStats);
app.get('/api/defRushStats/:team', playersCtrl.getDefPassStats);


var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});