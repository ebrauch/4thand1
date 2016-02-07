var app = angular.module('app', [])

app.factory('playerFactory', [function() {
    var hello = 'hi from factory'
    var wr = {
        pname: 'Emmanuel Sanders',
        pos  : 'RWR'
    }
    var rb = {
        pname: 'C.J. Anderson',
        pos  : 'RB'
    }
    var qb = {
        pname: 'Brock Osweiler',
        pos  : 'QB'
    }
    return {hi: hello}
}])

app.controller('analyze-controller', ['$scope', 'playerFactory', function($scope, playerFactory) {
    console.log(playerFactory.hi)
}])