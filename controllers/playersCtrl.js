var game = require('../models/schemas.js').game;
var player = require('../models/schemas.js').player;
var joinedPass = require('../models/schemas.js').joinedPass;
var posAverages = require('../models/schemas.js').posAverages;
var pbp = require('../models/schemas.js').pbp;
var offense = require('../models/schemas.js').offense;

var newPlayer = {};
var statsPopulated = false;
var defStatsPopulated = false;

function getAverages(req, res) {
    posAverages.find({}, function(err, data){
        res.send(data);
    })
}

function addPlayer(req, res) {
    newPlayer.player = req.params.player;
    newPlayer.cteam = req.params.team;
    process.nextTick(function () {
        getDef(newPlayer.cteam);
        getPos(newPlayer);
        getGamesPlayed(newPlayer)
    })

    function getGamesPlayed(newPlayer) {
        offense.find({player: newPlayer.player}, function(err, data){
            newPlayer.gp = data.length;
        })
    }

    function getPos(newPlayer) {
        player.find({player: newPlayer.player}, function (err, data) {
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
                    $or: [
                        {v: team},
                        {h: team}
                    ]
        }, function (err, data) {
            newPlayer.cteam == data[data.length - 1].h ? newPlayer.defense = data[data.length - 1].v : newPlayer.defense = data[data.length - 1].h
            getDefGp();
        });
    }

    function getDefGp() {
        game.find({
            $or: [
                {v: newPlayer.defense},
                {h: newPlayer.defense}
            ]
        }, function(err, data){
            newPlayer.defGp = data.length - 1;
        })
    }

    function getRecStats() {
        joinedPass.find({trg: newPlayer.player}, function (err, data) {
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
                if (data.indexOf(playData) == data.length - 1) {
                    statsPopulated = true;
                }
            });
        })
    }

    function getPassStats() {
        joinedPass.find({psr: newPlayer.player}, function (err, data) {
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
                if (data.indexOf(playData) == data.length - 1) {
                    statsPopulated = true;
                }
            });
        })
    }

    function getRushStats() {
        pbp.find({bc: newPlayer.player}, function (err, data) {
            newPlayer.LEAtt = 0;
            newPlayer.LEYds = 0;
            newPlayer.LTAtt = 0;
            newPlayer.LTYds = 0;
            newPlayer.LGAtt = 0;
            newPlayer.LGYds = 0;
            newPlayer.MDAtt = 0;
            newPlayer.MDYds = 0;
            newPlayer.RGAtt = 0;
            newPlayer.RGYds = 0;
            newPlayer.RTAtt = 0;
            newPlayer.RTYds = 0;
            newPlayer.REAtt = 0;
            newPlayer.REYds = 0;
            data.forEach(function (playData) {
                newPlayer[playData.dir + 'Att']++;
                newPlayer[playData.dir + 'Yds'] += playData.yds;
                if (data.indexOf(playData) == data.length - 1) {
                    statsPopulated = true;
                }
            });
        })
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
                if (data.indexOf(playData) == data.length - 1) {
                    defStatsPopulated = true;
                }
            });
            for (;;) {
                if (statsPopulated && defStatsPopulated) {
                    res.send(newPlayer);
                    break;
                }
            }
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
                if (data.indexOf(playData) == data.length - 1) {
                    defStatsPopulated = true;
                }
            });
            for (;;) {
                if (statsPopulated && defStatsPopulated) {
                    res.send(newPlayer);
                    break;
                }
            }
        })
    }

    function getDefRushStats() {
        pbp.find({def: newPlayer.defense}, function (err, data) {
            newPlayer.defLEAtt = 0;
            newPlayer.defLEYds = 0;
            newPlayer.defLTAtt = 0;
            newPlayer.defLTYds = 0;
            newPlayer.defLGAtt = 0;
            newPlayer.defLGYds = 0;
            newPlayer.defMDAtt = 0;
            newPlayer.defMDYds = 0;
            newPlayer.defRGAtt = 0;
            newPlayer.defRGYds = 0;
            newPlayer.defRTAtt = 0;
            newPlayer.defRTYds = 0;
            newPlayer.defREAtt = 0;
            newPlayer.defREYds = 0;
            data.forEach(function (playData) {
                newPlayer['def' + playData.dir + 'Att']++;
                newPlayer['def' + playData.dir + 'Yds'] += playData.yds;
                if (data.indexOf(playData) == data.length - 1) {
                    defStatsPopulated = true;
                }
            });
            for (;;) {
                if (statsPopulated && defStatsPopulated) {
                    res.send(newPlayer);
                    break;
                }
            }
        })
    }
}

module.exports = {
    addPlayer : addPlayer,
    getAverages : getAverages
};