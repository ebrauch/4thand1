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

    $scope.leagueAvgSlTrg = 0;
    $scope.leagueAvgSlYds = 0;
    $scope.leagueAvgSmTrg = 0;
    $scope.leagueAvgSmYds = 0;
    $scope.leagueAvgSrTrg = 0;
    $scope.leagueAvgSrYds = 0;
    $scope.leagueAvgDlTrg = 0;
    $scope.leagueAvgDlYds = 0;
    $scope.leagueAvgDmTrg = 0;
    $scope.leagueAvgDmYds = 0;
    $scope.leagueAvgDrTrg = 0;
    $scope.leagueAvgDrYds = 0;

    $scope.leagueAvgLeAtt = 0;
    $scope.leagueAvgLeYds = 0;
    $scope.leagueAvgLtAtt = 0;
    $scope.leagueAvgLtYds = 0;
    $scope.leagueAvgLgAtt = 0;
    $scope.leagueAvgLgYds = 0;
    $scope.leagueAvgMdAtt = 0;
    $scope.leagueAvgMdYds = 0;
    $scope.leagueAvgRgAtt = 0;
    $scope.leagueAvgRgYds = 0;
    $scope.leagueAvgRtAtt = 0;
    $scope.leagueAvgRtYds = 0;
    $scope.leagueAvgReAtt = 0;
    $scope.leagueAvgReYds = 0;

    $http.get('/api/leagueAvg/')
        .then(function(serverResponse){
            serverResponse.data.forEach(function(data){
                if (data.type == 'PASS') {
                    switch (data.loc) {
                        case 'SL':
                            $scope.leagueAvgSlTrg++;
                            $scope.leagueAvgSlYds += data.yds;
                            break;
                        case 'SM':
                            $scope.leagueAvgSmTrg++;
                            $scope.leagueAvgSmYds += data.yds;
                            break;
                        case 'SR':
                            $scope.leagueAvgSrTrg++;
                            $scope.leagueAvgSrYds += data.yds;
                            break;
                        case 'DL':
                            $scope.leagueAvgDlTrg++;
                            $scope.leagueAvgDlYds += data.yds;
                            break;
                        case 'DM':
                            $scope.leagueAvgDmTrg++;
                            $scope.leagueAvgDmYds += data.yds;
                            break;
                        case 'DR':
                            $scope.leagueAvgDrTrg++;
                            $scope.leagueAvgDrYds += data.yds;
                            break;
                    }
                }
                else if (data.type == 'RUSH') {
                    switch (data.dir) {
                        case 'LE':
                            $scope.leagueAvgLeAtt++;
                            $scope.leagueAvgLeYds += data.yds;
                            break;
                        case 'LT':
                            $scope.leagueAvgLtAtt++;
                            $scope.leagueAvgLtYds += data.yds;
                            break;
                        case 'LG':
                            $scope.leagueAvgLgAtt++;
                            $scope.leagueAvgLgYds += data.yds;
                            break;
                        case 'MD':
                            $scope.leagueAvgMdAtt++;
                            $scope.leagueAvgMdYds += data.yds;
                            break;
                        case 'RG':
                            $scope.leagueAvgRgAtt++;
                            $scope.leagueAvgRgYds += data.yds;
                            break;
                        case 'RT':
                            $scope.leagueAvgRtAtt++;
                            $scope.leagueAvgRtYds += data.yds;
                            break;
                        case 'RE':
                            $scope.leagueAvgReAtt++;
                            $scope.leagueAvgReYds += data.yds;
                            break;
                    }
                }
            })
        }).then(function() {
        $scope.leagueAvgSlYds = Math.floor(($scope.leagueAvgSlYds / $scope.leagueAvgSlTrg) * 100) / 100;
        $scope.leagueAvgSmYds = Math.floor(($scope.leagueAvgSmYds / $scope.leagueAvgSmTrg) * 100) / 100;
        $scope.leagueAvgSrYds = Math.floor(($scope.leagueAvgSrYds / $scope.leagueAvgSrTrg) * 100) / 100;
        $scope.leagueAvgDlYds = Math.floor(($scope.leagueAvgDlYds / $scope.leagueAvgDlTrg) * 100) / 100;
        $scope.leagueAvgDmYds = Math.floor(($scope.leagueAvgDmYds / $scope.leagueAvgDmTrg) * 100) / 100;
        $scope.leagueAvgDrYds = Math.floor(($scope.leagueAvgDrYds / $scope.leagueAvgDrTrg) * 100) / 100;

        $scope.leagueAvgLeYds = Math.floor(($scope.leagueAvgLeYds / $scope.leagueAvgLeAtt) * 100) / 100;
        $scope.leagueAvgLtYds = Math.floor(($scope.leagueAvgLtYds / $scope.leagueAvgLtAtt) * 100) / 100;
        $scope.leagueAvgLgYds = Math.floor(($scope.leagueAvgLgYds / $scope.leagueAvgLgAtt) * 100) / 100;
        $scope.leagueAvgMdYds = Math.floor(($scope.leagueAvgMdYds / $scope.leagueAvgMdAtt) * 100) / 100;
        $scope.leagueAvgRgYds = Math.floor(($scope.leagueAvgRgYds / $scope.leagueAvgRgAtt) * 100) / 100;
        $scope.leagueAvgRtYds = Math.floor(($scope.leagueAvgRtYds / $scope.leagueAvgRtAtt) * 100) / 100;
        $scope.leagueAvgReYds = Math.floor(($scope.leagueAvgReYds / $scope.leagueAvgReAtt) * 100) / 100;
        console.log($scope.leagueAvgSlYds, $scope.leagueAvgSmYds, $scope.leagueAvgSrYds);
        console.log($scope.leagueAvgDlYds, $scope.leagueAvgDmYds, $scope.leagueAvgDrYds);
        console.log($scope.leagueAvgLeYds, $scope.leagueAvgLtYds, $scope.leagueAvgLgYds, $scope.leagueAvgMdYds,
        $scope.leagueAvgRgYds, $scope.leagueAvgRtYds, $scope.leagueAvgReYds);
    });

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
        if( $scope.newPlayer.posd == 'QB') {
            $scope.addQb($scope.newPlayer);
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
        rb.leAtt = 0;
        rb.leYds = 0;
        rb.ltAtt = 0;
        rb.ltYds = 0;
        rb.lgAtt = 0;
        rb.lgYds = 0;
        rb.mdAtt = 0;
        rb.mdYds = 0;
        rb.rgAtt = 0;
        rb.rgYds = 0;
        rb.rtAtt = 0;
        rb.rtYds = 0;
        rb.reAtt = 0;
        rb.reYds = 0;
        $http.get('/api/rush/' + $scope.newPlayer.player).then(
            function (serverResponse) {
                serverResponse.data.forEach(function (data) {
                    switch (data.dir) {
                        case 'LE':
                            $scope.newPlayer.leAtt++;
                            $scope.newPlayer.leYds += data.yds;
                            break;
                        case 'LT':
                            $scope.newPlayer.ltAtt++;
                            $scope.newPlayer.ltYds += data.yds;
                            break;
                        case 'LG':
                            $scope.newPlayer.lgAtt++;
                            $scope.newPlayer.lgYds += data.yds;
                            break;
                        case 'MD':
                            $scope.newPlayer.mdAtt++;
                            $scope.newPlayer.mdYds += data.yds;
                            break;
                        case 'RG':
                            $scope.newPlayer.rgAtt++;
                            $scope.newPlayer.rgYds += data.yds;
                            break;
                        case 'RT':
                            $scope.newPlayer.rtAtt++;
                            $scope.newPlayer.rtYds += data.yds;
                            break;
                        case 'RE':
                            $scope.newPlayer.reAtt++;
                            $scope.newPlayer.reYds += data.yds;
                            break;
                    }
                });
            }).then(function() {
            $scope.getDefRushStats(rb);
        });
    }

    $scope.addQb = function(qb) {
        qb.slAtt = 0;
        qb.slYds = 0;
        qb.smAtt = 0;
        qb.smYds = 0;
        qb.srAtt = 0;
        qb.srYds = 0;
        qb.dlAtt = 0;
        qb.dlYds = 0;
        qb.dmAtt = 0;
        qb.dmYds = 0;
        qb.drAtt = 0;
        qb.drYds = 0;
        $http.get('/api/pass/' + qb.player)
            .then(function(serverResponse) {
                serverResponse.data.forEach(function(data){
                    switch (data.loc) {
                        case 'SL':
                            qb.slAtt++;
                            qb.slYds += data.yds;
                            break;
                        case 'SM':
                            qb.smAtt++;
                            qb.smYds += data.yds;
                            break;
                        case 'SR':
                            qb.srAtt++;
                            qb.srYds += data.yds;
                            break;
                        case 'DL':
                            qb.dlAtt++;
                            qb.dlYds += data.yds;
                            break;
                        case 'DM':
                            qb.dmAtt++;
                            qb.dmYds += data.yds;
                            break;
                        case 'DR':
                            qb.drAtt++;
                            qb.drYds += data.yds;
                            break;
                    }
                })
            }).then(function() {
            $scope.getDefPassStats(qb);
        })
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

        $http.get('/api/defPassStats/' + player.defense).then(
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
    $scope.getDefRushStats = function(player) {
        player.defLeAtt = 0;
        player.defLeYds = 0;
        player.defLtAtt = 0;
        player.defLtYds = 0;
        player.defLgAtt = 0;
        player.defLgYds = 0;
        player.defMdAtt = 0;
        player.defMdYds = 0;
        player.defRgAtt = 0;
        player.defRgYds = 0;
        player.defRtAtt = 0;
        player.defRtYds = 0;
        player.defReAtt = 0;
        player.defReYds = 0;

        $http.get('/api/defRushStats/' + player.defense).then(
            function(serverResponse) {
                serverResponse.data.forEach(function(data){
                    switch (data.dir) {
                        case 'LE':
                            player.defLeAtt++;
                            player.defLeYds += data.yds;
                            break;
                        case 'LT':
                            player.defLtAtt++;
                            player.defLtYds += data.yds;
                            break;
                        case 'LG':
                            player.defLgAtt++;
                            player.defLgYds += data.yds;
                            break;
                        case 'MD':
                            player.defMdAtt++;
                            player.defMdYds += data.yds;
                            break;
                        case 'RG':
                            player.defRgAtt++;
                            player.defRgYds += data.yds;
                            break;
                        case 'RT':
                            player.defRtAtt++;
                            player.defRtYds += data.yds;
                            break;
                        case 'RE':
                            player.defReAtt++;
                            player.defReYds += data.yds;
                            break;
                    }
                })
            });
        $scope.playerArray.push(player);
        console.log($scope.playerArray);
    }
}