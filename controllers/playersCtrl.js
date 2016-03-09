var pbp = require('../models/pbp.js');

function getPlayerData(req, res) {
    pbp.find({$or: [{bc: req.params.playerID}, {trg: req.params.playerID}, {psr: req.params.playerID}]}, function (err, playerData) {
        res.send(playerData);
    })
}

module.exports = {getPlayerData : getPlayerData};