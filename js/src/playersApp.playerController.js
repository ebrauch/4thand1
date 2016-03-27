angular.module('PlayersApp').controller('playerController', ['$scope', '$http', playerController]);

function playerController($scope, $http) {
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.averages = {};

    var options = {
        url: 'public/players.json',
        getValue: 'display',
        list: {
            match: {
                enabled: true
            },
            onSelectItemEvent: function () {
                $scope.newPlayer = $('#players').getSelectedItemData();
            },
        }
    };
    $scope.resetSearch = function () {
        $('#players').val('');
        return false
    };

    $('#players').easyAutocomplete(options);

    $http.get('/api/averages')
        .then(function(serverResponse){
            $scope.averages = serverResponse.data[0];
        })

    $scope.addPlayer = function (newPlayer) {
        if (!newPlayer.display) {
            return
        }
        $http.get('/api/' + $scope.newPlayer.player + '/' + $scope.newPlayer.cteam)
            .then(function (playerData) {
                playerData.data.leagueAvg = $scope.averages[playerData.data.posd + '' + playerData.data.dcp]
                playerData.data.display = $scope.newPlayer.display;
                $scope.playerArray.forEach(function (existingplayer) {
                    if (existingplayer.player == playerData.data.player) {
                        $('html,body').animate({
                            scrollTop: $("#" + playerData.data.player).offset().top - 100
                        });
                        playerData = {};
                    }
                });
                if (playerData != {}) {
                    if (!playerData.data.player) {
                        return
                    }
                    console.log(playerData.data);
                    $scope.playerArray.push(playerData.data);
                    setTimeout(function () {
                        $('html,body').animate({
                            scrollTop: $("#" + playerData.data.player).offset().top - 100
                        });
                    }, 0)
                }
            })
    }
}