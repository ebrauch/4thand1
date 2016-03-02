var app = angular.module('app', []);

app.factory('playerFactory', [function () {
    var hello = 'hi from factory';
    var player = {
            fname: 'Emmanuel',
            lname: 'Sanders',
            pos: 'WR',
            team: 'DEN',
            defense: 'San Diego',
            //trg, comp, yds
            sl: [38, 24, 181],
            sm: [19, 14, 194],
            sr: [27, 17, 149],
            dl: [16, 5, 139],
            dm: [7, 3, 102],
            dr: [22, 8, 271],
//            le: [1, 5],
//            lt: [0, 0],
//            lg: [0, 0],
//            md: [0, 0],
//            rg: [0, 0],
//            rt: [0, 0],
//            re: [1, 24],
            gp: 15
                    };
//,
//        {
//            fname: 'C.J',
//            lname: 'Anderson',
//            pos: 'RB',
//            team: 'DEN',
//            defense: 'San Diego',
//            sl: [16, 10, 59],
//            sm: [11, 9, 66],
//            sr: [5, 4, 36],
//            dl: [0, 0, 0],
//            dm: [0, 0, 0],
//            dr: [1, 1, 27],
//            le: [11, 95],
//            lt: [24, 115],
//            lg: [21, 75],
//            md: [38, 187],
//            rg: [16, 67],
//            rt: [20, 76],
//            re: [7, 10],
//            gp: 15
//                 }
                 
    var playerAvg = {
        slCompPct: Math.ceil(player.sl[1] / player.sl[0] * 100),
        smCompPct: Math.ceil(player.sm[1] / player.sm[0] * 100),
        srCompPct: Math.ceil(player.sr[1] / player.sr[0] * 100),
        dlCompPct: Math.ceil(player.dl[1] / player.dl[0] * 100),
        dmCompPct: Math.ceil(player.dm[1] / player.dm[0] * 100),
        drCompPct: Math.ceil(player.dr[1] / player.dr[0] * 100),
        slYPC: Math.ceil(player.sl[2] / player.sl[1]),
        smYPC: Math.ceil(player.sm[2] / player.sm[1]),
        srYPC: Math.ceil(player.sr[2] / player.sr[1]),
        dlYPC: Math.ceil(player.dl[2] / player.dl[1]),
        dmYPC: Math.ceil(player.dm[2] / player.dm[1]),
        drYPC: Math.ceil(player.dr[2] / player.dr[1]),
        YPG: Math.ceil((player.sl[2] + player.sm[2] + player.sr[2] + player.dl[2] + player.dm[2] + player.dr[2]) / player.gp)
    };

    var defense = {
        team: 'San Diego',
        sl: [152, 109, 1135],
        sm: [71, 56, 533],
        sr: [153, 108, 1030],
        dl: [34, 17, 450],
        dm: [11, 7, 178],
        dr: [45, 12, 381],
    };
    var defAvg = {
        slCompPct: Math.ceil(defense.sl[1] / defense.sl[0] * 100),
        smCompPct: Math.ceil(defense.sm[1] / defense.sm[0] * 100),
        srCompPct: Math.ceil(defense.sr[1] / defense.sr[0] * 100),
        dlCompPct: Math.ceil(defense.dl[1] / defense.dl[0] * 100),
        dmCompPct: Math.ceil(defense.dm[1] / defense.dm[0] * 100),
        drCompPct: Math.ceil(defense.dr[1] / defense.dr[0] * 100),
        slYPC: Math.ceil(defense.sl[2] / defense.sl[1]),
        smYPC: Math.ceil(defense.sm[2] / defense.sm[1]),
        srYPC: Math.ceil(defense.sr[2] / defense.sr[1]),
        dlYPC: Math.ceil(defense.dl[2] / defense.dl[1]),
        dmYPC: Math.ceil(defense.dm[2] / defense.dm[1]),
        drYPC: Math.ceil(defense.dr[2] / defense.dr[1])
    };
    return {
        hi: hello,
        player: player,
        defense: defense,
        defAvg: defAvg,
        playerAvg: playerAvg
    }
}]);

app.controller('analyze-controller', ['$scope', 'playerFactory', function ($scope, playerFactory) {

    var options = {
        url: "public/players.json",
        getValue: "display",
        list: {
            match: {
                enabled: true
            }
        },
        //theme: "square"
    };

    $("#players").easyAutocomplete(options);
    $scope.playerArray = [];
    $scope.defense = [playerFactory.defense];
//    console.log($scope.playerArray)
//    console.log($scope.defense)
    $scope.defAvg = playerFactory.defAvg;
//    console.log($scope.defAvg)
    $scope.playerAvg = playerFactory.playerAvg;
//    console.log($scope.playerAvg)

//    $scope.i = 0
//    $scope.newPlayer = function () {
//        $scope.playerArray.push(playerFactory.player);
//        $scope.playerArray.opp = playerFactory.defense;
//        document.getElementById('players').value = '';
//        console.log($scope.playerArray);
////        $scope.i += 1
//    };
    $scope.newPlayer = function(arg) {
        console.log(arg)
    }

    $scope.visibility = [true, false];
    $scope.displayLocStats = function (loc) {
        $scope.visibility = [false, true];
        $scope.compPct = playerFactory.playerAvg[loc + 'CompPct'];
        $scope.YPC = playerFactory.playerAvg[loc + 'YPC'];
        $scope.defCompPct = $scope.defAvg[loc + 'CompPct'];
        $scope.defYPC = $scope.defAvg[loc + 'YPC'];
        $scope.area = '';
        switch (loc) {
            case 'sl':
                $scope.area = 'Short left targets:';
                break;
            case 'sm':
                $scope.area = 'Short middle targets:';
                break;
            case 'sr':
                $scope.area = 'Short right targets:';
                break;
            case 'dl':
                $scope.area = 'Deep left targets:';
                break;
            case 'dm':
                $scope.area = 'Deep middle targets:';
                break;
            case 'dr':
                $scope.area = 'Deep right targets:';
                break;
            case 'le':
                $scope.area = 'Rushes towards left end:';
                break;
            case 'lt':
                $scope.area = 'Rushes towards left tackle:';
                break;
            case 'lg':
                $scope.area = 'Rushes towards left guard:';
                break;
            case 'md':
                $scope.area = 'Rushes up the middle:';
                break;
            case 'rg':
                $scope.area = 'Rushes towards right guard:';
                break;
            case 'rt':
                $scope.area = 'Rushes towards right tackle:';
                break;
            case 're':
                $scope.area = 'Rushes towards right end:'
        }
    };
    $scope.resetDisplay = function () {
        $scope.visibility = [true, false]
    }
}]);