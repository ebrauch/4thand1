var game = require('../models/schemas.js').game;
var player = require('../models/schemas.js').player;
var joinedPass = require('../models/schemas.js').joinedPass;
var posAverages = require('../models/schemas.js').posAverages;

var newPlayer = {};

function getAverages(req, res) {
    posAverages.find({}, function(err, data){
        res.send(data);
    })
}

function addPlayer(req, res) {
    newPlayer.player = req.params.player;
    newPlayer.cteam = req.params.team;
    process.nextTick(function(){
        getDef(newPlayer.cteam);
        getPos(newPlayer);
    })
    setTimeout(function(){
        res.send(newPlayer);
    },1000)
}

function getPos(newPlayer) {
    player.find({player: newPlayer.player}, function(err, data){
        if (data[0].posd == 'TE/H-' || data[0].posd == 'FB/TE') {
            newPlayer.dcp = 3;
            newPlayer.posd = 'TE';
        }
        else {
            newPlayer.dcp = data[0].dcp;
            newPlayer.posd = data[0].posd;
        }
        if (newPlayer.posd == 'LWR' || newPlayer.posd == 'RWR' || newPlayer.posd == 'TE') {
            getRecStats();
            getDefRecStats();
        }
        else if (newPlayer.posd == 'QB') {
            getPassStats();
            getDefPassStats();
        }
        else if (newPlayer.posd == 'RB') {
            getRushStats();
            getDefRushStats();
        }
    });
}

function getDef(team) {
    game.find({
        $and:[
            {$or: [
                {v: team},
                {h: team}
            ]},
            {wk:17}
        ]}, function(err, data){
        newPlayer.cteam == data[0].h ? newPlayer.defense = data[0].v : newPlayer.defense = data[0].h;
    });
}

function getRecStats() {
    joinedPass.find({trg: newPlayer.player}, function(err, data){
            newPlayer.DMTrg = 0;
            newPlayer.DMYds = 0;
            newPlayer.DRTrg = 0;
            newPlayer.DRYds = 0;
            newPlayer.SRTrg = 0;
            newPlayer.SRYds = 0;
            newPlayer.SMTrg = 0;
            newPlayer.SMYds = 0;
            newPlayer.SLTrg = 0;
            newPlayer.SLYds = 0;
            newPlayer.DLTrg = 0;
            newPlayer.DLYds = 0;

            data.forEach(function (playData) {
                newPlayer[playData.loc + 'Trg']++;
                newPlayer[playData.loc + 'Yds'] += playData.yds;
            });
    })
}

function getPassStats() {
    joinedPass.find({psr: newPlayer.player}, function(err, data){
        newPlayer.DMAtt = 0;
        newPlayer.DMYds = 0;
        newPlayer.DRAtt = 0;
        newPlayer.DRYds = 0;
        newPlayer.SRAtt = 0;
        newPlayer.SRYds = 0;
        newPlayer.SMAtt = 0;
        newPlayer.SMYds = 0;
        newPlayer.SLAtt = 0;
        newPlayer.SLYds = 0;
        newPlayer.DLAtt = 0;
        newPlayer.DLYds = 0;

        data.forEach(function (playData) {
            newPlayer[playData.loc + 'Att']++;
            newPlayer[playData.loc + 'Yds'] += playData.yds;
        });
    })
}

function getRushStats(player) {

}

function getDefRecStats() {
        joinedPass.find({$and: [{def: newPlayer.defense}, {posd: newPlayer.posd}, {dcp: newPlayer.dcp}]}, function (err, data) {
            newPlayer.defDMAtt = 0;
            newPlayer.defDMYds = 0;
            newPlayer.defDRAtt = 0;
            newPlayer.defDRYds = 0;
            newPlayer.defSRAtt = 0;
            newPlayer.defSRYds = 0;
            newPlayer.defSMAtt = 0;
            newPlayer.defSMYds = 0;
            newPlayer.defSLAtt = 0;
            newPlayer.defSLYds = 0;
            newPlayer.defDLAtt = 0;
            newPlayer.defDLYds = 0;

            data.forEach(function (playData) {
                newPlayer['def' + playData.loc + 'Att']++;
                newPlayer['def' + playData.loc + 'Yds'] += playData.yds;
            });
        })
}

function getDefPassStats() {
    joinedPass.find({def: newPlayer.defense}, function (err, data) {
        newPlayer.defDMAtt = 0;
        newPlayer.defDMYds = 0;
        newPlayer.defDRAtt = 0;
        newPlayer.defDRYds = 0;
        newPlayer.defSRAtt = 0;
        newPlayer.defSRYds = 0;
        newPlayer.defSMAtt = 0;
        newPlayer.defSMYds = 0;
        newPlayer.defSLAtt = 0;
        newPlayer.defSLYds = 0;
        newPlayer.defDLAtt = 0;
        newPlayer.defDLYds = 0;

        data.forEach(function (playData) {
            newPlayer['def' + playData.loc + 'Att']++;
            newPlayer['def' + playData.loc + 'Yds'] += playData.yds;
        });
    })
}

function getDefRushStats(player) {

}

module.exports = {
    addPlayer : addPlayer,
    getAverages : getAverages
}

//var pbp = require('../models/schemas.js').pbp;

//var offense = require('../models/schemas.js').offense;


//var posAverages = require('../models/schemas.js').posAverages;
//
//function getGamesPlayed(req, res) {
//    offense.find({player: req.params.playerID}, function(err, data){
//        res.send({gp : data.length})
//    })
//}
//
//function getDefGamesPlayed(req, res) {
//    game.find({$or: [{v: req.params.defense},{h: req.params.defense}]}, function(err, data){
//        res.send({defGp: data.length})
//    })
//}
//
//function getLeagueAverage(req, res) {
//    posAverages.find({}, function(err, data){
//        res.send(data);
//    })
//}
//function getRecData(req, res) {
//    pbp.find({trg: req.params.playerID}, function(err, data){
//        var serverResponse = {
//                dmTrg: 0,
//                dmYds: 0,
//                drTrg: 0,
//                drYds: 0,
//                srTrg: 0,
//                srYds: 0,
//                smTrg: 0,
//                smYds: 0,
//                slTrg: 0,
//                slYds: 0,
//                dlTrg: 0,
//                dlYds: 0,
//            };
//        data.forEach(function(playData){
//            if (playData.loc == 'DM') {
//                serverResponse.dmTrg++;
//                serverResponse.dmYds += playData.yds;
//            }
//            if (playData.loc == 'DR') {
//                serverResponse.drTrg++;
//                serverResponse.drYds += playData.yds;
//            }
//            if (playData.loc == 'SR') {
//                serverResponse.srTrg++;
//                serverResponse.srYds += playData.yds;
//            }
//            if (playData.loc == 'SM') {
//                serverResponse.smTrg++;
//                serverResponse.smYds += playData.yds;
//            }
//            if (playData.loc == 'SL') {
//                serverResponse.slTrg++;
//                serverResponse.slYds += playData.yds;
//            }
//            if (playData.loc == 'DL') {
//                serverResponse.dlTrg++;
//                serverResponse.dlYds += playData.yds;
//            }
//        });
//        res.send(serverResponse);
//    })
//}
//function getRushData(req, res) {
//    pbp.find({bc: req.params.playerID}, function(err, data){
//        var serverResponse = {
//            leAtt: 0,
//            leYds: 0,
//            ltAtt: 0,
//            ltYds: 0,
//            lgAtt: 0,
//            lgYds: 0,
//            mdAtt: 0,
//            mdYds: 0,
//            rgAtt: 0,
//            rgYds: 0,
//            rtAtt: 0,
//            rtYds: 0,
//            reAtt: 0,
//            reYds: 0
//        };
//        data.forEach(function(playData){
//            if (playData.dir == 'LE') {
//                serverResponse.leAtt++;
//                serverResponse.leYds += playData.yds;
//            }
//            if (playData.dir == 'LT') {
//                serverResponse.ltAtt++;
//                serverResponse.ltYds += playData.yds;
//            }
//            if (playData.dir == 'LG') {
//                serverResponse.lgAtt++;
//                serverResponse.lgYds += playData.yds;
//            }
//            if (playData.dir == 'MD') {
//                serverResponse.mdAtt++;
//                serverResponse.mdYds += playData.yds;
//            }
//            if (playData.dir == 'RG') {
//                serverResponse.rgAtt++;
//                serverResponse.rgYds += playData.yds;
//            }
//            if (playData.dir == 'RT') {
//                serverResponse.rtAtt++;
//                serverResponse.rtYds += playData.yds;
//            }
//            if (playData.dir == 'RE') {
//                serverResponse.reAtt++;
//                serverResponse.reYds += playData.yds;
//            }
//        });
//        res.send(serverResponse);
//    })
//}
//function getPassData(req, res) {
//    pbp.find({psr: req.params.playerID}, function(err, data){
//        var serverResponse = {
//            dmAtt: 0,
//            dmYds: 0,
//            drAtt: 0,
//            drYds: 0,
//            srAtt: 0,
//            srYds: 0,
//            smAtt: 0,
//            smYds: 0,
//            slAtt: 0,
//            slYds: 0,
//            dlAtt: 0,
//            dlYds: 0,
//        };
//        data.forEach(function(playData){
//            if (playData.loc == 'DM') {
//                serverResponse.dmAtt++;
//                serverResponse.dmYds += playData.yds;
//            }
//            if (playData.loc == 'DR') {
//                serverResponse.drAtt++;
//                serverResponse.drYds += playData.yds;
//            }
//            if (playData.loc == 'SR') {
//                serverResponse.srAtt++;
//                serverResponse.srYds += playData.yds;
//            }
//            if (playData.loc == 'SM') {
//                serverResponse.smAtt++;
//                serverResponse.smYds += playData.yds;
//            }
//            if (playData.loc == 'SL') {
//                serverResponse.slAtt++;
//                serverResponse.slYds += playData.yds;
//            }
//            if (playData.loc == 'DL') {
//                serverResponse.dlAtt++;
//                serverResponse.dlYds += playData.yds;
//            }
//        });
//        res.send(serverResponse);
//    })
//}

//function getDefPassStats(req, res) {
//    pbp.find({def: req.params.team}, function(err, data){
//        var serverResponse = {
//            defDmAtt: 0,
//            defDmYds: 0,
//            defDrAtt: 0,
//            defDrYds: 0,
//            defSrAtt: 0,
//            defSrYds: 0,
//            defSmAtt: 0,
//            defSmYds: 0,
//            defSlAtt: 0,
//            defSlYds: 0,
//            defDlAtt: 0,
//            defDlYds: 0,
//        };
//        data.forEach(function(playData){
//            if (playData.loc == 'DM') {
//                serverResponse.defDmAtt++;
//                serverResponse.defDmYds += playData.yds;
//            }
//            if (playData.loc == 'DR') {
//                serverResponse.defDrAtt++;
//                serverResponse.defDrYds += playData.yds;
//            }
//            if (playData.loc == 'SR') {
//                serverResponse.defSrAtt++;
//                serverResponse.defSrYds += playData.yds;
//            }
//            if (playData.loc == 'SM') {
//                serverResponse.defSmAtt++;
//                serverResponse.defSmYds += playData.yds;
//            }
//            if (playData.loc == 'SL') {
//                serverResponse.defSlAtt++;
//                serverResponse.defSlYds += playData.yds;
//            }
//            if (playData.loc == 'DL') {
//                serverResponse.defDlAtt++;
//                serverResponse.defDlYds += playData.yds;
//            }
//        });
//        res.send(serverResponse);
//    })
//}
//function getDefRushStats(req, res) {
//    pbp.find({def: req.params.team}, function(err, data){
//        var serverResponse = {
//            defLeAtt : 0,
//            defLeYds : 0,
//            defLtAtt : 0,
//            defLtYds : 0,
//            defLgAtt : 0,
//            defLgYds : 0,
//            defMdAtt : 0,
//            defMdYds : 0,
//            defRgAtt : 0,
//            defRgYds : 0,
//            defRtAtt : 0,
//            defRtYds : 0,
//            defReAtt : 0,
//            defReYds : 0
//        };
//        data.forEach(function(playData){
//            if (playData.dir == 'LE') {
//                serverResponse.defLeAtt++;
//                serverResponse.defLeYds += playData.yds;
//            }
//            if (playData.dir == 'LT') {
//                serverResponse.defLtAtt++;
//                serverResponse.defLtYds += playData.yds;
//            }
//            if (playData.dir == 'LG') {
//                serverResponse.defLgAtt++;
//                serverResponse.defLgYds += playData.yds;
//            }
//            if (playData.dir == 'MD') {
//                serverResponse.defMdAtt++;
//                serverResponse.defMdYds += playData.yds;
//            }
//            if (playData.dir == 'RG') {
//                serverResponse.defRgAtt++;
//                serverResponse.defRgYds += playData.yds;
//            }
//            if (playData.dir == 'RT') {
//                serverResponse.defRtAtt++;
//                serverResponse.defRtYds += playData.yds;
//            }
//            if (playData.dir == 'RE') {
//                serverResponse.defReAtt++;
//                serverResponse.defReYds += playData.yds;
//            }
//        });
//        res.send(serverResponse);
//    })
//}
//
//function getDefensePassStats(req, res) {
//            var serverResponse = {
//            defDmAtt: 0,
//            defDmYds: 0,
//            defDrAtt: 0,
//            defDrYds: 0,
//            defSrAtt: 0,
//            defSrYds: 0,
//            defSmAtt: 0,
//            defSmYds: 0,
//            defSlAtt: 0,
//            defSlYds: 0,
//            defDlAtt: 0,
//            defDlYds: 0,
//        };
//    if (req.params.posd != 'QB') {
//        joinedPass.find({$and: [{def: req.params.defense}, {posd: req.params.posd}, {dcp: req.params.dcp}]}, function (err, data) {
//            data.forEach(function (playData) {
//                if (playData.loc == 'DM') {
//                    serverResponse.defDmAtt++;
//                    serverResponse.defDmYds += playData.yds;
//                }
//                if (playData.loc == 'DR') {
//                    serverResponse.defDrAtt++;
//                    serverResponse.defDrYds += playData.yds;
//                }
//                if (playData.loc == 'SR') {
//                    serverResponse.defSrAtt++;
//                    serverResponse.defSrYds += playData.yds;
//                }
//                if (playData.loc == 'SM') {
//                    serverResponse.defSmAtt++;
//                    serverResponse.defSmYds += playData.yds;
//                }
//                if (playData.loc == 'SL') {
//                    serverResponse.defSlAtt++;
//                    serverResponse.defSlYds += playData.yds;
//                }
//                if (playData.loc == 'DL') {
//                    serverResponse.defDlAtt++;
//                    serverResponse.defDlYds += playData.yds;
//                }
//            });
//            res.send(serverResponse);
//        })
//    } else {
//        joinedPass.find({def: req.params.defense}, function(err, data){
//            data.forEach(function (playData) {
//                if (playData.loc == 'DM') {
//                    serverResponse.defDmAtt++;
//                    serverResponse.defDmYds += playData.yds;
//                }
//                if (playData.loc == 'DR') {
//                    serverResponse.defDrAtt++;
//                    serverResponse.defDrYds += playData.yds;
//                }
//                if (playData.loc == 'SR') {
//                    serverResponse.defSrAtt++;
//                    serverResponse.defSrYds += playData.yds;
//                }
//                if (playData.loc == 'SM') {
//                    serverResponse.defSmAtt++;
//                    serverResponse.defSmYds += playData.yds;
//                }
//                if (playData.loc == 'SL') {
//                    serverResponse.defSlAtt++;
//                    serverResponse.defSlYds += playData.yds;
//                }
//                if (playData.loc == 'DL') {
//                    serverResponse.defDlAtt++;
//                    serverResponse.defDlYds += playData.yds;
//                }
//            });
//            res.send(serverResponse);
//        })
//    }
//}
//
//function getPlayerData(req, res) {
//    player.find({player: req.params.playerID}, function(err, data){
//        res.send(data);
//    })
//}
//
//module.exports = {
//    getRecData         : getRecData,
//    getRushData        : getRushData,
//    getPassData        : getPassData,
//    getDef             : getDef,
//    //getDefPassStats    : getDefPassStats,
//    getDefRushStats    : getDefRushStats,
//    getLeagueAverage   : getLeagueAverage,
//    getGamesPlayed     : getGamesPlayed,
//    getDefGamesPlayed  : getDefGamesPlayed,
//    getDefensePassStats: getDefensePassStats,
//    getPlayerData      : getPlayerData
//};