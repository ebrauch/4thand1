var mongoose = require('mongoose');
var joinedPass = require('../models/schemas.js').joinedPass;
var pbp = require('../models/schemas.js').pbp;
var total = require('../models/schemas.js').total;
var game = require('../models/schemas.js').game;
var player = require('../models/schemas.js').player;
var offense = require('../models/schemas.js').offense;

mongoose.connect('mongodb://localhost/nfl');

updateLeagueStats();
updateTeamStats();
//updatePlayerStats();


function updateLeagueStats(){
    var response = {};
    response.gp = 0;
    var positions = [, 'TE', 'LWR', 'RWR'];
    var depth = [, 1, 2, 3, 4];
    var locs = [, 'DM', 'DR', 'SR', 'SM', 'SL', 'DL'];
    for (i = 1; i < 4; i++) {
        for (j = 1; j < 5; j++) {
            for (k = 1; k < 7; k++) {
                response[positions[i] + depth[j] + locs[k] + 'Att'] = 0;
                response[positions[i] + depth[j] + locs[k] + 'Yds'] = 0;
            }
        }
    }
    for (a = 1; a < locs.length; a++) {
        response[locs[a] + 'Att'] = 0;
        response[locs[a] + 'Yds'] = 0;
    }
    joinedPass.find({}, function (err, data) {
        data.forEach(function (play) {
            response[play.posd + play.dcp + play.loc + 'Att']++;
            response[play.posd + play.dcp + play.loc + 'Yds'] += play.yds;
            response[play.loc + 'Att'] ++;
            response[play.loc + 'Yds'] += play.yds;
        })
    })
    var dir = [, 'LE', 'LT', 'LG', 'MD', 'RG', 'RT', 'RE'];
    for (l = 1; l < dir.length; l++) {
        response[dir[l] + 'Att'] = 0;
        response[dir[l] + 'Yds'] = 0;
    }
    pbp.find({type: 'RUSH'}, function (err, data) {
        data.forEach(function (play) {
            response[play.dir + 'Att']++;
            response[play.dir + 'Yds'] += play.yds;
        })
    })
    game.find({}, function(err, data){
        data.forEach(function(game){
            if (game.gid) {
                response.gp++;
            }
        })
    })
    var obj = {};
    setTimeout(function () {
        for (var x in response) {
            if (response[x]) {
                obj[x] = response[x];
            }
        }
        console.log(obj)
        total.update({team: 'leagueTotal'}, obj).exec();
    }, 5000)
}

function updateTeamStats(){
    total.find({}, function(err, data){
        data.forEach(function(team){
            if (team.team.length < 4) {
                var response = {};
                response.gp = 0;
                var positions = [, 'TE', 'LWR', 'RWR'];
                var depth = [, 1, 2, 3, 4];
                var locs = [, 'DM', 'DR', 'SR', 'SM', 'SL', 'DL'];
                for (i = 1; i < 4; i++) {
                    for (j = 1; j < 5; j++) {
                        for (k = 1; k < 7; k++) {
                            response[positions[i] + depth[j] + locs[k] + 'Att'] = 0;
                            response[positions[i] + depth[j] + locs[k] + 'Yds'] = 0;
                        }
                    }
                }
                for (a = 1; a < locs.length; a++) {
                    response[locs[a] + 'Att'] = 0;
                    response[locs[a] + 'Yds'] = 0;
                }
                joinedPass.find({def: team.team}, function (err, data) {
                    data.forEach(function (play) {
                        response[play.posd + play.dcp + play.loc + 'Att']++;
                        response[play.posd + play.dcp + play.loc + 'Yds'] += play.yds;
                        response[play.loc + 'Att'] ++;
                        response[play.loc + 'Yds'] += play.yds;
                    })
                })
                var dir = [, 'LE', 'LT', 'LG', 'MD', 'RG', 'RT', 'RE'];
                for (l = 1; l < dir.length; l++) {
                    response[dir[l] + 'Att'] = 0;
                    response[dir[l] + 'Yds'] = 0;
                }
                pbp.find({$and:[{type: 'RUSH'}, {def: team.team}]}, function (err, data) {
                    data.forEach(function (play) {
                        response[play.dir + 'Att']++;
                        response[play.dir + 'Yds'] += play.yds;
                    })
                })
                game.find({$or:[{v:team.team},{h:team.team}]}, function(err, data){
                    data.forEach(function(game){
                        if (game.gid) {
                            response.gp++;
                        }
                    })
                })
                var obj = {};
                setTimeout(function () {
                    for (var x in response) {
                        if (response[x]) {
                            obj[x] = response[x];
                        }
                    }
                    console.log(team.team);
                    console.log(obj);
                    total.update({team: team.team}, obj).exec();
                }, 10000)
            }
        })
    })
}

function updatePlayerStats(){
    player.find({}, function(err, data){
        data.forEach(function(playerP){
            //if(playerP.player == 'AA-0025') {
                playerP.LEAtt = 0;
                playerP.LEYds = 0;
                playerP.LTAtt = 0;
                playerP.LTYds = 0;
                playerP.LGAtt = 0;
                playerP.LGYds = 0;
                playerP.MDAtt = 0;
                playerP.MDYds = 0;
                playerP.RGAtt = 0;
                playerP.RGYds = 0;
                playerP.RTAtt = 0;
                playerP.RTYds = 0;
                playerP.REAtt = 0;
                playerP.REYds = 0;
                playerP.DMAtt = 0;
                playerP.DMYds = 0;
                playerP.DRAtt = 0;
                playerP.DRYds = 0;
                playerP.SRAtt = 0;
                playerP.SRYds = 0;
                playerP.SMAtt = 0;
                playerP.SMYds = 0;
                playerP.SLAtt = 0;
                playerP.SLYds = 0;
                playerP.DLAtt = 0;
                playerP.DLYds = 0;
                playerP.gp = 0;
                playerP.def = '';
                updatePassStats(playerP);
                updateRushStats(playerP);
                updateGP(playerP);
                updateDef(playerP);
                //var obj = {};
                setTimeout(function () {
                    player.update({player: playerP.player}, playerP).exec();
                    console.log('done');
                }, 120000)
            //}
        })
    })
}

function updatePassStats(playerP) {
    if (playerP.posd == 'QB') {
        joinedPass.find({psr: playerP.player}, function(err, data){
            data.forEach(function(play){
                playerP[play.loc + 'Att']++;
                playerP[play.loc + 'Yds'] += play.yds;
            })
        })
    }
    else {
        joinedPass.find({trg: playerP.player}, function(err, data){
            data.forEach(function(play){
                playerP[play.loc + 'Att']++;
                playerP[play.loc + 'Yds'] += play.yds;
            })
        })
    }
}

function updateRushStats(playerP) {
    pbp.find({bc: playerP.player}, function(err, data){
        data.forEach(function(play){
            playerP[play.dir + 'Att']++;
            playerP[play.dir + 'Yds'] += play.yds;
        })
    })
    //setTimeout(function () {
    //}, 6000)
}
function updateGP(playerP){
    offense.find({player: playerP.player}, function(err, data){
        data.forEach(function(game){
            playerP.gp++;
        })
    })
}
function updateDef(playerP){
    if(playerP.cteam !== 'INA') {
        game.find({
            $or: [
                {v: playerP.cteam},
                {h: playerP.cteam}
            ]
        }, function (err, data) {
            playerP.cteam == data[data.length - 1].h ? playerP.def = data[data.length - 1].v : playerP.def = data[data.length - 1].h
        });
    }
}