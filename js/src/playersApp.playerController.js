angular.module('PlayersApp').controller('playerController', ['$scope', '$http', playerController]);

function playerController($scope, $http) {
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.averages = {};
    $scope.leagueTotals = {};
    $scope.firstPlayer = false;
    $scope.buttonDisplay = [true, false];

    var options = {
        url: 'public/players.json',
        getValue: 'display',
        list: {
            match: {
                enabled: true
            },
            onChooseEvent: function() {
                $scope.newPlayer = $('#players').getSelectedItemData();
                $scope.addPlayer($scope.newPlayer);
                $scope.resetSearch();
            }
        }
    };
    $scope.resetSearch = function () {
        $('#players').blur();
        $('#players').val('');
        return false
    };

    $('#players').easyAutocomplete(options);

    $http.get('/api/totals')
        .then(function(serverResponse){
            $scope.leagueTotals = serverResponse.data;
        })

    $scope.addPlayer = function (newPlayer) {
        $scope.firstPlayer = true;
        if (!newPlayer.display) {
            return
        }
        $http.get('/api/' + $scope.newPlayer.player)
            .then(function (playerData) {
                var display = $scope.newPlayer.display;
                $scope.newPlayer = playerData.data[0];
                $scope.newPlayer.display = display;
                $scope.leagueTotals.forEach(function(team){
                    if (team.team == $scope.newPlayer.def) {
                        $scope.newPlayer.defStats = team;
                    }
                })
                playerData.data.display = $scope.newPlayer.display;
                $scope.playerArray.forEach(function (existingplayer) {
                    if (existingplayer.player == $scope.newPlayer.player) {
                        $('html,body').animate({
                            scrollTop: $("#" + $scope.newPlayer.player).offset().top - 100
                        });
                        $scope.newPlayer = {};
                    }
                });
                if ($scope.newPlayer != {}) {
                    if (!$scope.newPlayer.player) {
                        return
                    }
                    $scope.playerArray.push($scope.newPlayer);
                    setTimeout(function () {
                        $('html,body').animate({
                            scrollTop: $("#" + $scope.newPlayer.player).offset().top - 100
                        });
                    }, 0)
                }
            })
    }
}