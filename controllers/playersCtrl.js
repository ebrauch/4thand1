var pbp = require('../models/pbp.js').pbp;
var game = require('../models/pbp.js').game;
var average = require('../models/pbp.js').average;

function getLeagueAverage(req, res) {
    average.find({}, function(err, data){
        res.send(data);
    })
}
function getRecData(req, res) {
    pbp.find({trg: req.params.playerID}, function(err, data){
        var serverResponse = {
                dmTrg: 0,
                dmYds: 0,
                drTrg: 0,
                drYds: 0,
                srTrg: 0,
                srYds: 0,
                smTrg: 0,
                smYds: 0,
                slTrg: 0,
                slYds: 0,
                dlTrg: 0,
                dlYds: 0,
            }
        data.forEach(function(playData){
            if (playData.loc == 'DM') {
                serverResponse.dmTrg++;
                serverResponse.dmYds += playData.yds;
            }
            if (playData.loc == 'DR') {
                serverResponse.drTrg++;
                serverResponse.drYds += playData.yds;
            }
            if (playData.loc == 'SR') {
                serverResponse.srTrg++;
                serverResponse.srYds += playData.yds;
            }
            if (playData.loc == 'SM') {
                serverResponse.smTrg++;
                serverResponse.smYds += playData.yds;
            }
            if (playData.loc == 'SL') {
                serverResponse.slTrg++;
                serverResponse.slYds += playData.yds;
            }
            if (playData.loc == 'DL') {
                serverResponse.dlTrg++;
                serverResponse.dlYds += playData.yds;
            }
        });
        res.send(serverResponse);
    })
}
function getRushData(req, res) {
    pbp.find({bc: req.params.playerID}, function(err, data){
        var serverResponse = {
            leAtt: 0,
            leYds: 0,
            ltAtt: 0,
            ltYds: 0,
            lgAtt: 0,
            lgYds: 0,
            mdAtt: 0,
            mdYds: 0,
            rgAtt: 0,
            rgYds: 0,
            rtAtt: 0,
            rtYds: 0,
            reAtt: 0,
            reYds: 0
        }
        data.forEach(function(playData){
            if (playData.dir == 'LE') {
                serverResponse.leAtt++;
                serverResponse.leYds += playData.yds;
            }
            if (playData.dir == 'LT') {
                serverResponse.ltAtt++;
                serverResponse.ltYds += playData.yds;
            }
            if (playData.dir == 'LG') {
                serverResponse.lgAtt++;
                serverResponse.lgYds += playData.yds;
            }
            if (playData.dir == 'MD') {
                serverResponse.mdAtt++;
                serverResponse.mdYds += playData.yds;
            }
            if (playData.dir == 'RG') {
                serverResponse.rgAtt++;
                serverResponse.rgYds += playData.yds;
            }
            if (playData.dir == 'RT') {
                serverResponse.rtAtt++;
                serverResponse.rtYds += playData.yds;
            }
            if (playData.dir == 'RE') {
                serverResponse.reAtt++;
                serverResponse.reYds += playData.yds;
            }
        });
        res.send(serverResponse);
    })
}
function getPassData(req, res) {
    pbp.find({psr: req.params.playerID}, function(err, data){
        var serverResponse = {
            dmAtt: 0,
            dmYds: 0,
            drAtt: 0,
            drYds: 0,
            srAtt: 0,
            srYds: 0,
            smAtt: 0,
            smYds: 0,
            slAtt: 0,
            slYds: 0,
            dlAtt: 0,
            dlYds: 0,
        }
        data.forEach(function(playData){
            if (playData.loc == 'DM') {
                serverResponse.dmAtt++;
                serverResponse.dmYds += playData.yds;
            }
            if (playData.loc == 'DR') {
                serverResponse.drAtt++;
                serverResponse.drYds += playData.yds;
            }
            if (playData.loc == 'SR') {
                serverResponse.srAtt++;
                serverResponse.srYds += playData.yds;
            }
            if (playData.loc == 'SM') {
                serverResponse.smAtt++;
                serverResponse.smYds += playData.yds;
            }
            if (playData.loc == 'SL') {
                serverResponse.slAtt++;
                serverResponse.slYds += playData.yds;
            }
            if (playData.loc == 'DL') {
                serverResponse.dlAtt++;
                serverResponse.dlYds += playData.yds;
            }
        });
        res.send(serverResponse);
    })
}
function getDef(req, res) {
    game.find({
        $and:[
            {$or: [
                {v:req.params.team},
                {h:req.params.team}
            ]},
            {wk:17}
        ]}, function(err, data){
        res.send(data);
    });

}
function getDefPassStats(req, res) {
    pbp.find({def: req.params.team}, function(err, data){
        var serverResponse = {
            defDmAtt: 0,
            defDmYds: 0,
            defDrAtt: 0,
            defDrYds: 0,
            defSrAtt: 0,
            defSrYds: 0,
            defSmAtt: 0,
            defSmYds: 0,
            defSlAtt: 0,
            defSlYds: 0,
            defDlAtt: 0,
            defDlYds: 0,
        }
        data.forEach(function(playData){
            if (playData.loc == 'DM') {
                serverResponse.defDmAtt++;
                serverResponse.defDmYds += playData.yds;
            }
            if (playData.loc == 'DR') {
                serverResponse.defDrAtt++;
                serverResponse.defDrYds += playData.yds;
            }
            if (playData.loc == 'SR') {
                serverResponse.defSrAtt++;
                serverResponse.defSrYds += playData.yds;
            }
            if (playData.loc == 'SM') {
                serverResponse.defSmAtt++;
                serverResponse.defSmYds += playData.yds;
            }
            if (playData.loc == 'SL') {
                serverResponse.defSlAtt++;
                serverResponse.defSlYds += playData.yds;
            }
            if (playData.loc == 'DL') {
                serverResponse.defDlAtt++;
                serverResponse.defDlYds += playData.yds;
            }
        });
        res.send(serverResponse);
    })
}
function getDefRushStats(req, res) {
    pbp.find({def: req.params.team}, function(err, data){
        var serverResponse = {
            defLeAtt : 0,
            defLeYds : 0,
            defLtAtt : 0,
            defLtYds : 0,
            defLgAtt : 0,
            defLgYds : 0,
            defMdAtt : 0,
            defMdYds : 0,
            defRgAtt : 0,
            defRgYds : 0,
            defRtAtt : 0,
            defRtYds : 0,
            defReAtt : 0,
            defReYds : 0
        }
        data.forEach(function(playData){
            if (playData.dir == 'LE') {
                serverResponse.defLeAtt++;
                serverResponse.defLeYds += playData.yds;
            }
            if (playData.dir == 'LT') {
                serverResponse.defLtAtt++;
                serverResponse.defLtYds += playData.yds;
            }
            if (playData.dir == 'LG') {
                serverResponse.defLgAtt++;
                serverResponse.defLgYds += playData.yds;
            }
            if (playData.dir == 'MD') {
                serverResponse.defMdAtt++;
                serverResponse.defMdYds += playData.yds;
            }
            if (playData.dir == 'RG') {
                serverResponse.defRgAtt++;
                serverResponse.defRgYds += playData.yds;
            }
            if (playData.dir == 'RT') {
                serverResponse.defRtAtt++;
                serverResponse.defRtYds += playData.yds;
            }
            if (playData.dir == 'RE') {
                serverResponse.defReAtt++;
                serverResponse.defReYds += playData.yds;
            }
        });
        res.send(serverResponse);
    })
}

module.exports = {
    getRecData      : getRecData,
    getRushData     : getRushData,
    getPassData     : getPassData,
    getDef          : getDef,
    getDefPassStats : getDefPassStats,
    getDefRushStats : getDefRushStats,
    getLeagueAverage: getLeagueAverage
};