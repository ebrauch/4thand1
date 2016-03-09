var pbp = require('../models/pbp.js').pbp;
var game = require('../models/pbp.js').game;

//function getPlayerData(req, res) {
//    pbp.find({$or: [{bc: req.params.playerID}, {trg: req.params.playerID}, {psr: req.params.playerID}]}, function (err, playerData) {
//        res.send(playerData);
//    })
//}

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
function getDefData(req, res) {
    game.find({
        $and:[
            {$or: [
                {v:req.params.team},
                {h:req.params.team}
            ]},
            {wk:17}
        ]}, function(err, data){
        res.send(data);
    })
}

module.exports = {
    getRecData  : getRecData,
    getRushData : getRushData,
    getPassData : getPassData,
    getDefData  : getDefData
};