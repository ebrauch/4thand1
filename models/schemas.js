var mongoose = require('mongoose');

var averageSchema = mongoose.Schema({
    _id: {},
    _batch: {},
    _useReadCommands: {},
    _cursorid: {},
    _batchSize: {},
    _ns: {},
    _db: {},
    _collName: {},
    _cursorHandle: {},
    close: {},
    _runGetMoreCommand: {},
    _hasNextUsingCommands: {},
    hasNext: {},
    next: {},
    objsLeftInBatch: {},
    help: {},
    toArray: {},
    forEach: {},
    map: {},
    itcount: {},
    shellPrint: {},
    pretty: {}
})

var pbpSchema = mongoose.Schema({
    gid  : Number,
    pid  : Number,
    off  : String,
    def  : String,
    type : String,
    yds  : Number,
    bc   : String,
    dir  : String,
    psr  : String,
    comp : String,
    spk  : String,
    loc  : String,
    trg  : String,
    ints : String
});

var gameSchema = mongoose.Schema({
    gid  : Number,
    seas : Number,
    wk   : Number,
    day  : String,
    v    : String,
    h    : String,
    stad : String,
    temp : Number,
    humd : Number,
    wspd : Number,
    wdir : String,
    cond : String,
    surf : String,
    ptsv : Number,
    ptsh : Number
})

var offenseSchema  = mongoose.Schema({
    _id: {},
    uid: Number,
    gid: Number,
    player: String,
    pa: Number,
    pc: Number,
    py: Number,
    ints: Number,
    tdp: Number,
    ra: Number,
    sra: Number,
    ry: Number,
    tdr: Number,
    trg: Number,
    rec: Number,
    recy: Number,
    tdrec: Number,
    ret: Number,
    rety: Number,
    tdret: Number,
    fuml: Number,
    peny: Number,
    snp: Number,
    game: Number,
    seas: Number,
    year: Number,
    team: String,
    posd: String,
    jnum: Number,
    dcp: Number
})

var joinedPassSchema = mongoose.Schema({
    _id: {},
    gid: Number,
    psr: String,
    trg: String,
    loc: String,
    yds: Number,
    comp: Number,
    succ: Number,
    def: String,
    pos1: String,
    posd: String,
    dcp: Number
})

var playerSchema = mongoose.Schema({
    _id: {},
    player: String,
    fname: String,
    lname: String,
    pname: String,
    pos1: String,
    pos2: String,
    height: Number,
    weight: Number,
    yob: Number,
    bench: Number,
    broad: Number,
    dpos: Number,
    col: String,
    dv: String,
    start: Number,
    cteam: String,
    posd: String,
    jnum: Number,
    dcp: Number
})

var posAveragesSchema = mongoose.Schema({
    _id: {},
    TE1: {},
    TE2: {},
    TE3: {},
    TE4: {},
    RWR1: {},
    RWR2: {},
    RWR3: {},
    LWR1: {},
    LWR2: {},
    LWR3: {},

})

module.exports = {
    pbp        : mongoose.model('pbp', pbpSchema, 'pbp'),
    game       : mongoose.model('game', gameSchema, 'game'),
    average    : mongoose.model('average', averageSchema, 'average'),
    offense    : mongoose.model('offense', offenseSchema, 'offense'),
    joinedPass : mongoose.model('joinedPass', joinedPassSchema, 'joinedPass'),
    player     : mongoose.model('player', playerSchema, 'player'),
    posAverages: mongoose.model('posAverages', posAveragesSchema, 'posAverages')
}