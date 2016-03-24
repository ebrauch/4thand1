var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/nfl');

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
    //res.sendFile('index.html', {root: './'});
    res.render('index', {title: '4th and 1'});
});

var playersCtrl = require('./controllers/playersCtrl.js');

app.get('/api/:player/:team', playersCtrl.addPlayer);

//app.get('/api/rec/:playerID', playersCtrl.getRecData);
//app.get('/api/rush/:playerID', playersCtrl.getRushData);
//app.get('/api/pass/:playerID', playersCtrl.getPassData);
//app.get('/api/def/:team', playersCtrl.getDef);
//app.get('/api/defRushStats/:team', playersCtrl.getDefRushStats);
//app.get('/api/leagueAvg', playersCtrl.getLeagueAverage);
//app.get('/api/gamesPlayed/:playerID', playersCtrl.getGamesPlayed);
//app.get('/api/defGamesPlayed/:defense', playersCtrl.getDefGamesPlayed);
//app.get('/api/defPassStats/:defense/:posd/:dcp', playersCtrl.getDefensePassStats);
//app.get('/api/newPlayer/:playerID', playersCtrl.getPlayerData);

var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});