var mongoose = require('mongoose');

var pbpSchema = mongoose.Schema({
    gid  : Number,
    pid  : Number,
    off  : String,
    def  : String,
    type : String,
    yds  : Number,
    succ : String,
    bc   : String,
    dir  : String,
    psr  : String,
    comp : String,
    spk  : String,
    loc  : String,
    trg  : String,
    ints : String
});

module.exports = mongoose.model('pbp', pbpSchema, 'pbp');