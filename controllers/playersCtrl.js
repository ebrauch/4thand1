var player = require('../models/schemas.js').player;
var total = require('../models/schemas.js').total;

function getTotals(req, res) {
    total.find({}, function(err, data){
        if (err) {
            return 'Error getting league totals';
        }
        res.send(data);
    })
}

function addPlayer(req, res) {
    player.find({player: req.params.player}, function(err, data){
        if (err) {
            return 'Error getting player data';
        }
        res.send(data);
    })
}

module.exports = {
    addPlayer : addPlayer,
    getTotals : getTotals
};