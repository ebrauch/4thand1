var app = angular.module('app', [])

app.factory('playerFactory', [function() {
    var hello = 'hi from factory'
    return {hi: hello}
}])

app.controller('analyze-controller', ['$scope', 'playerFactory', function($scope, playerFactory) {
    console.log(playerFactory.hi)
}])