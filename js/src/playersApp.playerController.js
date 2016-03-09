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
            onSelectItemEvent: function() {
                $scope.newPlayer = $('#players').getSelectedItemData();
            }
        }
        //theme: 'square'
    };
    $('#players').easyAutocomplete(options);
    $scope.addPlayer = function() {
        if ($scope.newPlayer.posd == 'LWR' || $scope.newPlayer.posd ==
            'RWR' || $scope.newPlayer.posd == 'TE') {
            $scope.newPlayer.slTrg = 0;
            $scope.newPlayer.slYds = 0;
            $scope.newPlayer.smTrg = 0;
            $scope.newPlayer.smYds = 0;
            $scope.newPlayer.srTrg = 0;
            $scope.newPlayer.srYds = 0;
            $scope.newPlayer.dlTrg = 0;
            $scope.newPlayer.dlYds = 0;
            $scope.newPlayer.dmTrg = 0;
            $scope.newPlayer.dmYds = 0;
            $scope.newPlayer.drTrg = 0;
            $scope.newPlayer.drYds = 0;
            $http.get('/api/rec/' + $scope.newPlayer.player).then(
                function(serverResponse) {
                    serverResponse.data.forEach(function(data) {
                        switch (data.loc) {
                            case 'SL':
                                $scope.newPlayer.slTrg++;
                                $scope.newPlayer.slYds +=
                                    data.yds;
                                break;
                            case 'SM':
                                $scope.newPlayer.smTrg++;
                                $scope.newPlayer.smYds +=
                                    data.yds;
                                break;
                            case 'SR':
                                $scope.newPlayer.srTrg++;
                                $scope.newPlayer.srYds +=
                                    data.yds;
                                break;
                            case 'DL':
                                $scope.newPlayer.dlTrg++;
                                $scope.newPlayer.dlYds +=
                                    data.yds;
                                break;
                            case 'DM':
                                $scope.newPlayer.dmTrg++;
                                $scope.newPlayer.dmYds +=
                                    data.yds;
                                break;
                            case 'DR':
                                $scope.newPlayer.drTrg++;
                                $scope.newPlayer.drYds +=
                                    data.yds;
                                break;
                        }
                    });
                    $scope.playerArray.push($scope.newPlayer);
                    $scope.newPlayer = {};
                    console.log($scope.playerArray);
                });
        } else if ($scope.newPlayer.posd == 'RB') {
            $scope.newPlayer.leAtt = 0;
            $scope.newPlayer.leYds = 0;
            $scope.newPlayer.ltAtt = 0;
            $scope.newPlayer.ltYds = 0;
            $scope.newPlayer.lgAtt = 0;
            $scope.newPlayer.lgYds = 0;
            $scope.newPlayer.mdAtt = 0;
            $scope.newPlayer.mdYds = 0;
            $scope.newPlayer.rgAtt = 0;
            $scope.newPlayer.rgYds = 0;
            $scope.newPlayer.rtAtt = 0;
            $scope.newPlayer.rtYds = 0;
            $scope.newPlayer.reAtt = 0;
            $scope.newPlayer.reYds = 0;
            $http.get('/api/rush/' + $scope.newPlayer.player).then(
                function(serverResponse) {
                    serverResponse.data.forEach(function(data) {
                        switch (data.dir) {
                            case 'LE':
                                $scope.newPlayer.leAtt++;
                                $scope.newPlayer.leYds +=
                                    data.yds;
                                break;
                            case 'LT':
                                $scope.newPlayer.ltAtt++;
                                $scope.newPlayer.ltYds +=
                                    data.yds;
                                break;
                            case 'LG':
                                $scope.newPlayer.lgAtt++;
                                $scope.newPlayer.lgYds +=
                                    data.yds;
                                break;
                            case 'MD':
                                $scope.newPlayer.mdAtt++;
                                $scope.newPlayer.mdYds +=
                                    data.yds;
                                break;
                            case 'RG':
                                $scope.newPlayer.rgAtt++;
                                $scope.newPlayer.rgYds +=
                                    data.yds;
                                break;
                            case 'RT':
                                $scope.newPlayer.rtAtt++;
                                $scope.newPlayer.rtYds +=
                                    data.yds;
                                break;
                            case 'RE':
                                $scope.newPlayer.reAtt++;
                                $scope.newPlayer.reYds +=
                                    data.yds;
                                break;
                        }
                    });
                    $scope.playerArray.push($scope.newPlayer);
                    $scope.newPlayer = {};
                    console.log($scope.playerArray);
                });
        } else if ($scope.newPlayer.posd == 'QB') {
            $scope.newPlayer.slPaA = 0;
            $scope.newPlayer.slPaY = 0;
            $scope.newPlayer.smPaA = 0;
            $scope.newPlayer.smPaY = 0;
            $scope.newPlayer.srPaA = 0;
            $scope.newPlayer.srPaY = 0;
            $scope.newPlayer.dlPaA = 0;
            $scope.newPlayer.dlPaY = 0;
            $scope.newPlayer.dmPaA = 0;
            $scope.newPlayer.dmPaY = 0;
            $scope.newPlayer.drPaA = 0;
            $scope.newPlayer.drPaY = 0;
            $http.get('/api/pass/' + $scope.newPlayer.player).then(
                function(serverResponse) {
                    serverResponse.data.forEach(function(data) {
                        switch (data.loc) {
                            case 'SL':
                                $scope.newPlayer.slPaA++;
                                $scope.newPlayer.slPaY +=
                                    data.yds;
                                break;
                            case 'SM':
                                $scope.newPlayer.smPaA++;
                                $scope.newPlayer.smPaY +=
                                    data.yds;
                                break;
                            case 'SR':
                                $scope.newPlayer.srPaA++;
                                $scope.newPlayer.srPaY +=
                                    data.yds;
                                break;
                            case 'DL':
                                $scope.newPlayer.dlPaA++;
                                $scope.newPlayer.dlPaY +=
                                    data.yds;
                                break;
                            case 'DM':
                                $scope.newPlayer.dmPaA++;
                                $scope.newPlayer.dmPaY +=
                                    data.yds;
                                break;
                            case 'DR':
                                $scope.newPlayer.drPaA++;
                                $scope.newPlayer.drPaY +=
                                    data.yds;
                                break;
                        }
                    });
                    $scope.playerArray.push($scope.newPlayer);
                    $scope.newPlayer = {};
                    console.log($scope.playerArray);
                });
        }
    }
}