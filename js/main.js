var app = angular.module('app', [])

app.factory('playerFactory', [function() {
    var hello = 'hi from factory'
    var player = {
        fname: 'Emmanuel',
        lname: 'Sanders',
        pos  : 'WR',
        team : 'DEN',
        sl   : [8, 8],
        sm   : [],
        sr   : [0],
        dl   : [],
        dm   : [],
        dr   : [35, 16]
    }
    var defense = {
        team: 'SD',
        sl  : [0, 3, 7, 4, 3, 0, 14, 5, 0, 0, 3, 0, 8, 0],
        sm  : [17, 2, 10, 7, 7, 0, 11, 4, 8, 0],
        sr  : [10, 0, 0, 3, 7, 33],
        dl  : [16, 0],
        dm  : [],
        dr  : [22, 0, 0, 0]
    }
    return {hi    : hello,
           player : player,
           defense: defense}
}])

app.controller('analyze-controller', ['$scope', 'playerFactory', function($scope, playerFactory) {
    console.log(playerFactory.hi)
    console.log(playerFactory.player)
    console.log(playerFactory.defense)
}])