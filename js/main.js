var app = angular.module('app', [])

app.factory('playerFactory', [function() {
    var hello = 'hi from factory'
    var player = {
        fname: 'Emmanuel',
        lname: 'Sanders',
        name : this.fname + ' ' + this.lname,
        pos  : 'WR',
        team : 'DEN',
        sl   : [8, 8],
        sm   : [],
        sr   : [0],
        dl   : [],
        dm   : [],
        dr   : [35, 16],
        avg  : [8, 0, 0, 0, 0, 25.5]
    }
    
    var defense = {
        team: 'SD',
        sl  : [0, 3, 7, 4, 3, 0, 14, 5, 0, 0, 3, 0, 8, 0],
        sm  : [17, 2, 10, 7, 7, 0, 11, 4, 8, 0],
        sr  : [10, 0, 0, 3, 7, 33],
        dl  : [16, 0],
        dm  : [],
        dr  : [22, 0, 0, 0],
        avg : [7.85, 6.6, 8.83, 8, 0, 5.5]
    }
    return {hi    : hello,
           player : player,
           defense: defense}
}])

app.controller('analyze-controller', ['$scope', 'playerFactory', function($scope, playerFactory) {
    console.log(playerFactory.hi)
    console.log(playerFactory.player.avg)
    console.log(playerFactory.defense.avg)
    
    var options =  {
        url: "players.json",
        getValue: "name",
        list: {
            match: {
                enabled: true
            }
        },
        theme: "square"
    }
    $("#players").easyAutocomplete(options)
}])