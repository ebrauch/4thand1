angular.module('PlayersApp').controller('playerController', ['$scope', '$http',
    playerController
]);

function playerController($scope, $http) {
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.leaguePaAvg = [];
    $scope.leagueRuAvg = [];

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
            //onKeyEnterEvent: function() {
            //    $scope.addPlayer();
            //}
        }
        //theme: 'square'
    };
    $scope.resetSearch = function () {
        $('#players').val('');
        return false
    }
    $scope.dupeCheck = function (player) {
        console.log('here i am')
        for (i = 0; i < $scope.playerArray.length - 2; i++) {
            if (player.player == $scope.playerArray[i].player) {
                return true
            }
        }
        return false
    }

    $('#players').easyAutocomplete(options);

    $http.get('/api/leagueAvg/')
        .then(function (serverResponse) {
            var i = 0;
            serverResponse.data.forEach(function (data) {
                if (i < 12) {
                    $scope.leaguePaAvg.push(data._batch);
                }
                else {
                    $scope.leagueRuAvg.push(data._batch);
                }
                i++;
            })
        })

    $scope.addPlayer = function () {
        $http.get('/api/def/' + $scope.newPlayer.cteam)
            .then(function (serverResponse) {
                if ($scope.newPlayer.cteam == serverResponse.data[0].h) {
                    $scope.newPlayer.defense = serverResponse.data[0].v;
                }
                else {
                    $scope.newPlayer.defense = serverResponse.data[0].h;
                }
            });
        if ($scope.newPlayer.posd == 'LWR' || $scope.newPlayer.posd == 'RWR' || $scope.newPlayer.posd == 'TE') {
            $scope.addRec($scope.newPlayer);
        }
        if ($scope.newPlayer.posd == 'RB') {
            $scope.addRb($scope.newPlayer);
        }
        if ($scope.newPlayer.posd == 'QB') {
            $scope.addQb($scope.newPlayer);
        }
    }

    $scope.addRec = function (receiver) {
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
                }).then(function () {
            $scope.getDefPassStats(receiver);
        });
    }

    $scope.addRb = function (rb) {
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
            }).then(function () {
            $scope.getDefRushStats(rb);
        });
    }

    $scope.addQb = function (qb) {
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
        qb.qb = true;
        $http.get('/api/pass/' + qb.player)
            .then(function (serverResponse) {
                serverResponse.data.forEach(function (data) {
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
            }).then(function () {
            $scope.getDefPassStats(qb);
        })
    }

    $scope.getDefPassStats = function (player) {
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
            function (serverResponse) {
                serverResponse.data.forEach(function (data) {
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
            }).then(function () {
            console.log($scope.playerArray.indexOf(player))
            //$scope.playerArray.indexOf(player > -1) ? false : $scope.playerArray.push(player);
            console.log(player.player)
            $scope.playerArray.forEach(function (existingplayer) {
                console.log('ayy lmao')
                console.log(existingplayer.player == player.player)
                if (existingplayer.player == player.player) {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                    //setTimeout(function(){
                    player = {};
                    //}, 0)
                }
            })
            if (player != {}) {
                $scope.playerArray.push(player);
                setTimeout(function () {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                }, 0)
            }
        })
    }
    $scope.getDefRushStats = function (player) {
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
            function (serverResponse) {
                serverResponse.data.forEach(function (data) {
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
            }).then(function () {
            console.log($scope.playerArray.indexOf(player))
            //$scope.playerArray.indexOf(player > -1) ? false : $scope.playerArray.push(player);
            console.log(player.player)
            $scope.playerArray.forEach(function (existingplayer) {
                console.log('ayy lmao')
                console.log(existingplayer.player == player.player)
                if (existingplayer.player == player.player) {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                    //setTimeout(function(){
                    player = {};
                    //}, 0)
                }
            })
            if (player != {}) {
                $scope.playerArray.push(player);
                setTimeout(function () {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                }, 0)
            }
        })
    }
}