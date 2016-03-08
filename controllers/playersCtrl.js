var Player = require('../models/players.js');

function getPlayerData(req, res, next) {
    console.log(req.params.playerID);
}

module.exports = {getPlayerData : getPlayerData};