var Player = require('../models/pbp.js');

function getPlayerData(req, res) {
    Player.findOne({player: req.params.playerID}, function (err, player) {
        res.send(player);
})
}

module.exports = {getPlayerData : getPlayerData};