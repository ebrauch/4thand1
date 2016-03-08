var Player = require('../models/players.js');

function getPlayerData(req, res, next) {
    Player.findOne({})
}