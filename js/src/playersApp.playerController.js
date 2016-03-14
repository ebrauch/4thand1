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
        if ($scope.newPlayer.posd == 'LWR' || $scope.newPlayer.posd == 'RWR' || $scope.newPlayer.posd.split('/')[0] == 'TE' || $scope.newPlayer.posd.split('/')[1] == 'TE' || $scope.newPlayer.posd == 'SWR') {
            $scope.addRec($scope.newPlayer);
        }
        if ($scope.newPlayer.posd == 'RB' || $scope.newPlayer.posd == 'FB') {
            $scope.addRb($scope.newPlayer);
        }
        if ($scope.newPlayer.posd == 'QB') {
            $scope.addQb($scope.newPlayer);
        }
    }

    $scope.addRec = function (receiver) {
        $http.get('/api/rec/' + receiver.player)
            .then(function (serverResponse) {
                receiver.dmTrg = serverResponse.data.dmTrg;
                receiver.dmYds = serverResponse.data.dmYds;
                receiver.drTrg = serverResponse.data.drTrg;
                receiver.drYds = serverResponse.data.drYds;
                receiver.srTrg = serverResponse.data.srTrg;
                receiver.srYds = serverResponse.data.srYds;
                receiver.smTrg = serverResponse.data.smTrg;
                receiver.smYds = serverResponse.data.smYds;
                receiver.slTrg = serverResponse.data.slTrg;
                receiver.slYds = serverResponse.data.slYds;
                receiver.dlTrg = serverResponse.data.dlTrg;
                receiver.dlYds = serverResponse.data.dlYds;
                $scope.getDefPassStats(receiver);
        });
    }

    $scope.addRb = function (rb) {
        $http.get('/api/rush/' + rb.player)
            .then(function (serverResponse) {
                rb.leAtt =  serverResponse.data.leAtt;
                rb.leYds =  serverResponse.data.leYds;
                rb.ltAtt =  serverResponse.data.ltAtt;
                rb.ltYds =  serverResponse.data.ltYds;
                rb.lgAtt =  serverResponse.data.lgAtt;
                rb.lgYds =  serverResponse.data.lgYds;
                rb.mdAtt =  serverResponse.data.mdAtt;
                rb.mdYds =  serverResponse.data.mdYds;
                rb.rgAtt =  serverResponse.data.rgAtt;
                rb.rgYds =  serverResponse.data.rgYds;
                rb.rtAtt =  serverResponse.data.rtAtt;
                rb.rtYds =  serverResponse.data.rtYds;
                rb.reAtt =  serverResponse.data.reAtt;
                rb.reYds =  serverResponse.data.reYds;
            $scope.getDefRushStats(rb);
        });
    }

    $scope.addQb = function (qb) {
        $http.get('/api/pass/' + qb.player)
            .then(function (serverResponse) {
                qb.dmAtt = serverResponse.data.dmAtt;
                qb.dmYds = serverResponse.data.dmYds;
                qb.drAtt = serverResponse.data.drAtt;
                qb.drYds = serverResponse.data.drYds;
                qb.srAtt = serverResponse.data.srAtt;
                qb.srYds = serverResponse.data.srYds;
                qb.smAtt = serverResponse.data.smAtt;
                qb.smYds = serverResponse.data.smYds;
                qb.slAtt = serverResponse.data.slAtt;
                qb.slYds = serverResponse.data.slYds;
                qb.dlAtt = serverResponse.data.dlAtt;
                qb.dlYds = serverResponse.data.dlYds;
                $scope.getDefPassStats(qb);
        })
    }

    $scope.getDefPassStats = function (player) {
        $http.get('/api/defPassStats/' + player.defense)
            .then(
            function (serverResponse) {
                player.defDmAtt = serverResponse.data.defDmAtt;
                player.defDmYds = serverResponse.data.defDmYds;
                player.defDrAtt = serverResponse.data.defDrAtt;
                player.defDrYds = serverResponse.data.defDrYds;
                player.defSrAtt = serverResponse.data.defSrAtt;
                player.defSrYds = serverResponse.data.defSrYds;
                player.defSmAtt = serverResponse.data.defSmAtt;
                player.defSmYds = serverResponse.data.defSmYds;
                player.defSlAtt = serverResponse.data.defSlAtt;
                player.defSlYds = serverResponse.data.defSlYds;
                player.defDlAtt = serverResponse.data.defDlAtt;
                player.defDlYds = serverResponse.data.defDlYds;
            })
            .then(function () {
            $scope.playerArray.forEach(function (existingplayer) {
                if (existingplayer.player == player.player) {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                    player = {};
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
        $http.get('/api/defRushStats/' + player.defense).then(
            function (serverResponse) {
                    player.defLeAtt = serverResponse.data.defLeAtt;
                    player.defLeYds = serverResponse.data.defLeYds;
                    player.defLtAtt = serverResponse.data.defLtAtt;
                    player.defLtYds = serverResponse.data.defLtYds;
                    player.defLgAtt = serverResponse.data.defLgAtt;
                    player.defLgYds = serverResponse.data.defLgYds;
                    player.defMdAtt = serverResponse.data.defMdAtt;
                    player.defMdYds = serverResponse.data.defMdYds;
                    player.defRgAtt = serverResponse.data.defRgAtt;
                    player.defRgYds = serverResponse.data.defRgYds;
                    player.defRtAtt = serverResponse.data.defRtAtt;
                    player.defRtYds = serverResponse.data.defRtYds;
                    player.defReAtt = serverResponse.data.defReAtt;
                    player.defReYds = serverResponse.data.defReYds;
            })
            .then(function () {
            $scope.playerArray.forEach(function (existingplayer) {
                if (existingplayer.player == player.player) {
                    $('html,body').animate({
                        scrollTop: $("#" + player.player).offset().top - 100
                    });
                    player = {};
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