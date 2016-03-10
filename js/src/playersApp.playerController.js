angular.module('PlayersApp').controller('playerController', ['$scope', '$http',
    playerController
]);

function playerController($scope, $http) {
    $scope.newPlayer = {};
    $scope.playerArray = [];

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
    };

    $('#players').easyAutocomplete(options);

    $scope.addPlayer = function() {
        $http.get('/api/def/' + $scope.newPlayer.cteam)
            .then(function(serverResponse){
                if ($scope.newPlayer.cteam == serverResponse.data[0].h) {
                    $scope.newPlayer.defense = serverResponse.data[0].v;
                }
                else {
                    $scope.newPlayer.defense = serverResponse.data[0].h;
                }
            })
        if ($scope.newPlayer.posd == 'LWR' || $scope.newPlayer.posd == 'RWR' || $scope.newPlayer.posd == 'TE') {
            $scope.addRec($scope.newPlayer);
        }
        if ($scope.newPlayer.posd == 'RB') {
            $scope.addRb($scope.newPlayer);
        }
    }

    $scope.addRec = function(receiver) {
        receiver.slTrg = 0;
        receiver.slYds = 0;
        receiver.smTrg = 0;
        receiver.smYds = 0;
        receiver.srTrg = 0;
        receiver.srYds = 0;
        receiver.dlTrg = 0;
        receiver.dlYds = 0;
        receiver.dmTrg = 0;
        receiver.dmYds = 0;
        receiver.drTrg = 0;
        receiver.drYds = 0;
        $http.get('/api/rec/' + receiver.player)
            .then(
                function (serverResponse) {
                    serverResponse.data.forEach(function (data) {
                        switch (data.loc) {
                            case 'SL':
                                receiver.slTrg++;
                                receiver.slYds += data.yds;
                                break;
                            case 'SM':
                                receiver.smTrg++;
                                receiver.smYds += data.yds;
                                break;
                            case 'SR':
                                receiver.srTrg++;
                                receiver.srYds += data.yds;
                                break;
                            case 'DL':
                                receiver.dlTrg++;
                                receiver.dlYds += data.yds;
                                break;
                            case 'DM':
                                receiver.dmTrg++;
                                receiver.dmYds += data.yds;
                                break;
                            case 'DR':
                                receiver.drTrg++;
                                receiver.drYds += data.yds;
                                break;
                        }
                    });
                }).then(function() {
            $scope.getDefPassStats(receiver);
        });
    }

    $scope.addRb = function(rb) {

    }

    $scope.addQb = function(qb) {

    }

    $scope.getDefPassStats = function(player) {
        player.defSlTrg = 0;
        player.defSlYds = 0;
        player.defSmTrg = 0;
        player.defSmYds = 0;
        player.defSrTrg = 0;
        player.defSrYds = 0;
        player.defDlTrg = 0;
        player.defDlYds = 0;
        player.defDmTrg = 0;
        player.defDmYds = 0;
        player.defDrTrg = 0;
        player.defDrYds = 0;

        $http.get('/api/defPassStats/' + arguments[0].defense).then(
            function(serverResponse) {
                serverResponse.data.forEach(function(data){
                    switch (data.loc) {
                        case 'SL':
                            $scope.newPlayer.defSlTrg++;
                            $scope.newPlayer.defSlYds += data.yds;
                            break;
                        case 'SM':
                            $scope.newPlayer.defSmTrg++;
                            $scope.newPlayer.defSmYds += data.yds;
                            break;
                        case 'SR':
                            $scope.newPlayer.defSrTrg++;
                            $scope.newPlayer.defSrYds += data.yds;
                            break;
                        case 'DL':
                            $scope.newPlayer.defDlTrg++;
                            $scope.newPlayer.defDlYds += data.yds;
                            break;
                        case 'DM':
                            $scope.newPlayer.defDmTrg++;
                            $scope.newPlayer.defDmYds += data.yds;
                            break;
                        case 'DR':
                            $scope.newPlayer.defDrTrg++;
                            $scope.newPlayer.defDrYds += data.yds;
                            break;
                    }
                })
            });
        $scope.playerArray.push(player);
        console.log($scope.playerArray);
    }
}