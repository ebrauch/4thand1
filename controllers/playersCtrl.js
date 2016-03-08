var Player = require('../models/players.js');

function getPlayerData(req, res) {
    Player.findOne({player: req.params.playerID}, function (err, player) {
        res.send(player);
})
}

module.exports = {getPlayerData : getPlayerData};