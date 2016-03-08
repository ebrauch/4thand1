var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    player   : String,
    fname    : String,
    lname    : String,
    pname    : String,
    pos1     : String,
    pos2     : String,
    height   : Number,
    weight   : Number,
    yob      : Number,
    bench    : Number,
    broad    : Number,
    dpos     : Number,
    col      : String,
    dv       : String,
    start    : Number,
    cteam    : String,
    posd     : String,
    jnum     : Number,
    dcp      : Number
});

module.exports = mongoose.model('player', playerSchema, 'player');