var pbp = require('../models/pbp.js');

function getPlayerData(req, res) {
    pbp.findOne({bc: req.params.playerID}, function (err, player) {
        console.log(player);
        res.send(player);
})
}

module.exports = {getPlayerData : getPlayerData};