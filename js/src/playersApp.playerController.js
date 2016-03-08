angular.module('PlayersApp').controller('playerController', ['$scope', '$http', playerController])

function playerController($scope, $http) {
    $scope.newPlayer = {};
    var options = {
        url: 'public/players.json',
        getValue: 'display',
        list: {
            match: {
                enabled: true
            },
            onSelectItemEvent: function () {
                $scope.newPlayer = $('#players').getSelectedItemData();
            }
        }
        //theme: 'square'
    }
    $('#players').easyAutocomplete(options);
    $scope.addPlayer = function() {
        console.log($scope.newPlayer)
    }
}