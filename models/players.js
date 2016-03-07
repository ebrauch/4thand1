var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    fname : String,
    lname : String,
    team  : String,
    pos   : String,
    opp   : String,
    dcPos : Number,
    rush  : {},
    rec   : {},
    pass  : {},
    def   : {}
});

module.exports = mongoose.model('Players', playerSchema);