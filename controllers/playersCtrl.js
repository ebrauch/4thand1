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
        res.send(data);
    })
}
function getRushData(req, res) {
    pbp.find({bc: req.params.playerID}, function(err, data){
        res.send(data);
    })
}
function getPassData(req, res) {
    pbp.find({psr: req.params.playerID}, function(err, data){
        res.send(data);
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
        res.send(data);
    })
}
function getDefRushStats(req, res) {
    console.log(req.params.team);
    pbp.find({def: req.params.team}, function(err, data){
        res.send(data);
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