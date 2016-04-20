angular.module('PlayersApp').controller('chartController', ['$scope', chartController]);

function chartController ($scope) {
    $scope.buildAButton = function() {
        $scope.buttonDisplay[0] ? $(".showYPG").text("Display Yards Per Game") : $(".showYPG").text("Display Yards Per Attempt");
    }
    $scope.changeView = function() {
        $scope.buttonDisplay[0] = !$scope.buttonDisplay[0];
        $scope.buttonDisplay[1] = !$scope.buttonDisplay[1];
        $scope.buttonDisplay[0] ? $(".showYPG").text("Display Yards Per Game") : $(".showYPG").text("Display Yards Per Attempt");
        $scope.playerArray.forEach(function(player){
            if (player.posd == 'TE' || player.posd == 'LWR' || player.posd == 'RWR' || player.posd == 'SWR') {
                $scope.buildWrChart(player);
            }
            else if (player.posd == 'RB' || player.posd == 'FB') {
                $scope.buildRbChart(player);
            }
            else if (player.posd == 'QB') {
                $scope.buildQbChart(player);
            }
        })
    }
    var leagueTot = $scope.leagueTotals[0];
    $scope.teamColors = {
        ARI: "#97233F",
        ATL: "#A71930",
        BAL: "#241773",
        BUF: "#00338D",
        CAR: "#0085CA",
        CHI: "#0B162A",
        CIN: "#FB4F14",
        CLE: "#FB4F14",
        DAL: "#002244",
        DEN: "#FB4F14",
        DET: "#005A8B",
        GB : "#203731",
        HOU: "#A71930",
        IND: "#002C5F",
        JAC: "#D7A22A",
        KC : "#E31837",
        STL: "#002244",
        MIA: "#F58220",
        MIN: "#4F2683",
        NE : "#002244",
        NO : "#9F8958",
        NYG: "#0B2265",
        NYJ: "#203731",
        OAK: "#A5ACAF",
        PHI: "#004953",
        PIT: "#FFB612",
        SD : "#0073CF",
        SF : "#AA0000",
        SEA: "#69BE28",
        TB : "#D50A0A",
        TEN: "#4B92DB",
        WAS: "#773141"
    };
    $scope.buildWrChart = function (wr) {
        var displayData = [];
        if ($scope.buttonDisplay[0]) {
            displayData = [
                [
                    Math.floor(wr.DMYds / wr.DMAtt * 100) / 100 || 0,
                    Math.floor(wr.DRYds / wr.DRAtt * 100) / 100 || 0,
                    Math.floor(wr.SRYds / wr.SRAtt * 100) / 100 || 0,
                    Math.floor(wr.SMYds / wr.SMAtt * 100) / 100 || 0,
                    Math.floor(wr.SLYds / wr.SLAtt * 100) / 100 || 0,
                    Math.floor(wr.DLYds / wr.DLAtt * 100) / 100 || 0
                ],
                [
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DMYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'DMAtt'] * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DRYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'DRAtt'] * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SRYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'SRAtt'] * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SMYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'SMAtt'] * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SLYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'SLAtt'] * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DLYds'] / wr.defStats[wr.posd + '' + wr.dcp + 'DLAtt'] * 100) / 100 || 0
                ],
                [
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DMYds'] / leagueTot[wr.posd + '' + wr.dcp + 'DMAtt'] * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DRYds'] / leagueTot[wr.posd + '' + wr.dcp + 'DRAtt'] * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SRYds'] / leagueTot[wr.posd + '' + wr.dcp + 'SRAtt'] * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SMYds'] / leagueTot[wr.posd + '' + wr.dcp + 'SMAtt'] * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SLYds'] / leagueTot[wr.posd + '' + wr.dcp + 'SLAtt'] * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DLYds'] / leagueTot[wr.posd + '' + wr.dcp + 'DLAtt'] * 100) / 100 || 0
                ],
                'Receiving Yards Per Target'
            ]
        }
        else {
            displayData = [
                [
                    Math.floor(wr.DMYds / wr.gp * 100) / 100 || 0,
                    Math.floor(wr.DRYds / wr.gp * 100) / 100 || 0,
                    Math.floor(wr.SRYds / wr.gp * 100) / 100 || 0,
                    Math.floor(wr.SMYds / wr.gp * 100) / 100 || 0,
                    Math.floor(wr.SLYds / wr.gp * 100) / 100 || 0,
                    Math.floor(wr.DLYds / wr.gp * 100) / 100 || 0
                ],
                [
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DMYds'] / wr.defStats.gp * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DRYds'] / wr.defStats.gp * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SRYds'] / wr.defStats.gp * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SMYds'] / wr.defStats.gp * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'SLYds'] / wr.defStats.gp * 100) / 100 || 0,
                    Math.floor(wr.defStats[wr.posd + '' + wr.dcp + 'DLYds'] / wr.defStats.gp * 100) / 100 || 0
                ],
                [
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DMYds'] / leagueTot.gp * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DRYds'] / leagueTot.gp * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SRYds'] / leagueTot.gp * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SMYds'] / leagueTot.gp * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'SLYds'] / leagueTot.gp * 100) / 100 || 0,
                    Math.floor(leagueTot[wr.posd + '' + wr.dcp + 'DLYds'] / leagueTot.gp * 100) / 100 || 0
                ],
                'Receiving Yards Per Game'
            ]
        }
        $(function() {
            setTimeout(function(){
                $('#' + wr.player).highcharts({
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    chart: {
                        polar: true,
                        type: 'line'
                    },

                    title: {
                        text: displayData[3]
                    },

                    pane: {
                        size: '80%'
                    },

                    xAxis: {
                        categories: ['Deep Middle',
                            'Deep Right',
                            'Short Right',
                            'Short Middle',
                            'Short Left',
                            'Deep Left'],
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },

                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },

                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
                    },

                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },

                    series: [{
                        name: wr.display.split(' -')[0],
                        data: displayData[0],
                        pointPlacement: 'on',
                        color: $scope.teamColors[wr.cteam]
                    }, {
                        name: wr.def + ' v. ' + wr.posd + '-' + wr.dcp + 's',
                        data: displayData[1],
                        pointPlacement: 'on',
                        color: $scope.teamColors[wr.def]
                    },
                        {
                        name: 'League Average v. ' + wr.posd + '-' + wr.dcp + 's',
                        data: displayData[2],
                        pointPlacement: 'on',
                        dashStyle: 'shortdash'
                    }]
                })
            },0)
        })
    };
    $scope.buildRbChart = function (rb) {
        var displayData = [];
        if ($scope.buttonDisplay[0]) {
            displayData = [
                [
                    Math.floor(rb.LEYds / rb.LEAtt * 100) / 100 || 0,
                    Math.floor(rb.LTYds / rb.LTAtt * 100) / 100 || 0,
                    Math.floor(rb.LGYds / rb.LGAtt * 100) / 100 || 0,
                    Math.floor(rb.MDYds / rb.MDAtt * 100) / 100 || 0,
                    Math.floor(rb.RGYds / rb.RGAtt * 100) / 100 || 0,
                    Math.floor(rb.RTYds / rb.RTAtt * 100) / 100 || 0,
                    Math.floor(rb.REYds / rb.REAtt * 100) / 100 || 0
                ],
                [
                    Math.floor(rb.defStats.LEYds / rb.defStats.LEAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.LTYds / rb.defStats.LTAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.LGYds / rb.defStats.LGAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.MDYds / rb.defStats.MDAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.RGYds / rb.defStats.RGAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.RTYds / rb.defStats.RTAtt * 100) / 100 || 0,
                    Math.floor(rb.defStats.REYds / rb.defStats.REAtt * 100) / 100 || 0
                ],
                [
                    Math.floor(leagueTot.LEYds / leagueTot.LEAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.LTYds / leagueTot.LTAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.LGYds / leagueTot.LGAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.MDYds / leagueTot.MDAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.RGYds / leagueTot.RGAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.RTYds / leagueTot.RTAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.REYds / leagueTot.REAtt * 100) / 100 || 0
                ],
                'Rushing Yards Per Attempt',
                true
            ]
        }
        else {
            displayData = [
                [
                    Math.floor(rb.LEYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.LTYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.LGYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.MDYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.RGYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.RTYds / rb.gp * 100) / 100 || 0,
                    Math.floor(rb.REYds / rb.gp * 100) / 100 || 0
                ],
                [
                    Math.floor(rb.defStats.LEYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.LTYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.LGYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.MDYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.RGYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.RTYds / rb.defStats.gp * 100) / 100 || 0,
                    Math.floor(rb.defStats.REYds / rb.defStats.gp * 100) / 100 || 0
                ],
                [
                    //Divide by 50 because stats are counted by both defense and player
                    Math.floor(leagueTot.LEYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.LTYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.LGYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.MDYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.RGYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.RTYds / leagueTot.gp * 50) / 100 || 0,
                    Math.floor(leagueTot.REYds / leagueTot.gp * 50) / 100 || 0
                ],
                'Rushing Yards Per Game',
            ]
        }
        $(function () {
            setTimeout(function () {
                $('#' + rb.player).highcharts(
                    {
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        title: {
                            text: displayData[3]
                        },
                        xAxis: {
                            categories: ['Left End', 'Left Tackle', 'Left Guard', 'Middle', 'Right Guard', 'Right Tackle', 'Right End']
                        },
                        series: [
                            {
                                type: 'column',
                                name: rb.display.split(' -')[0],
                                data: displayData[0],
                                color: $scope.teamColors[rb.cteam]
                            },
                            {
                                type: 'column',
                                name: rb.def,
                                data: displayData[1],
                                color: $scope.teamColors[rb.def]
                            },
                            {
                                type: 'spline',
                                name: 'League Average',
                                data: displayData[2],
                                marker: {
                                    lineWidth: 2,
                                    lineColor: Highcharts.getOptions().colors[3],
                                    fillColor: 'white'
                                }
                            },
                        ]
                    })
            }, 0);
        })
    };

    $scope.buildQbChart = function(qb) {
        var displayData = [];
        if ($scope.buttonDisplay[0]) {
            displayData = [
                [
                    Math.floor(qb.DMYds / qb.DMAtt * 100) / 100 || 0,
                    Math.floor(qb.DRYds / qb.DRAtt * 100) / 100 || 0,
                    Math.floor(qb.SRYds / qb.SRAtt * 100) / 100 || 0,
                    Math.floor(qb.SMYds / qb.SMAtt * 100) / 100 || 0,
                    Math.floor(qb.SLYds / qb.SLAtt * 100) / 100 || 0,
                    Math.floor(qb.DLYds / qb.DLAtt * 100) / 100 || 0
                ],
                [
                    Math.floor(qb.defStats.DMYds / qb.defStats.DMAtt * 100) / 100 || 0,
                    Math.floor(qb.defStats.DRYds / qb.defStats.DRAtt * 100) / 100 || 0,
                    Math.floor(qb.defStats.SRYds / qb.defStats.SRAtt * 100) / 100 || 0,
                    Math.floor(qb.defStats.SMYds / qb.defStats.SMAtt * 100) / 100 || 0,
                    Math.floor(qb.defStats.SLYds / qb.defStats.SLAtt * 100) / 100 || 0,
                    Math.floor(qb.defStats.DLYds / qb.defStats.DLAtt * 100) / 100 || 0
                ],
                [
                    Math.floor(leagueTot.DMYds / leagueTot.DMAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.DRYds / leagueTot.DRAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.SRYds / leagueTot.SRAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.SMYds / leagueTot.SMAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.SLYds / leagueTot.SLAtt * 100) / 100 || 0,
                    Math.floor(leagueTot.DLYds / leagueTot.DLAtt * 100) / 100 || 0
                ],
                'Passing Yards Per Attempt',
            ]
        }
        else {
            displayData = [
                [
                    Math.floor(qb.DMYds / qb.gp * 100) / 100 || 0,
                    Math.floor(qb.DRYds / qb.gp * 100) / 100 || 0,
                    Math.floor(qb.SRYds / qb.gp * 100) / 100 || 0,
                    Math.floor(qb.SMYds / qb.gp * 100) / 100 || 0,
                    Math.floor(qb.SLYds / qb.gp * 100) / 100 || 0,
                    Math.floor(qb.DLYds / qb.gp * 100) / 100 || 0
                ],
                [
                    Math.floor(qb.defStats.DMYds / qb.defStats.gp * 100) / 100 || 0,
                    Math.floor(qb.defStats.DRYds / qb.defStats.gp * 100) / 100 || 0,
                    Math.floor(qb.defStats.SRYds / qb.defStats.gp * 100) / 100 || 0,
                    Math.floor(qb.defStats.SMYds / qb.defStats.gp * 100) / 100 || 0,
                    Math.floor(qb.defStats.SLYds / qb.defStats.gp * 100) / 100 || 0,
                    Math.floor(qb.defStats.DLYds / qb.defStats.gp * 100) / 100 || 0
                ],
                [
                    Math.floor(leagueTot.DMYds / leagueTot.gp * 100) / 100 / 2 || 0,
                    Math.floor(leagueTot.DRYds / leagueTot.gp * 100) / 100 / 2 || 0,
                    Math.floor(leagueTot.SRYds / leagueTot.gp * 100) / 100 / 2 || 0,
                    Math.floor(leagueTot.SMYds / leagueTot.gp * 100) / 100 / 2 || 0,
                    Math.floor(leagueTot.SLYds / leagueTot.gp * 100) / 100 / 2 || 0,
                    Math.floor(leagueTot.DLYds / leagueTot.gp * 100) / 100 / 2 || 0
                ],
                'Passing Yards Per Game',
            ]
        }
        $(function() {
            setTimeout(function(){
               $('#' + qb.player).highcharts({
                   credits: {
                       enabled: false
                   },
                   exporting: {
                       enabled: false
                   },
                   chart: {
                       polar: true,
                       type: 'line'
                   },

                   title: {
                       text: displayData[3]
                   },

                   pane: {
                       size: '80%'
                   },

                   xAxis: {
                       categories: ['Deep Middle',
                                    'Deep Right',
                                    'Short Right',
                                    'Short Middle',
                                    'Short Left',
                                    'Deep Left'],
                       tickmarkPlacement: 'on',
                       lineWidth: 0
                   },

                   yAxis: {
                       gridLineInterpolation: 'polygon',
                       lineWidth: 0,
                       min: 0
                   },

                   tooltip: {
                       shared: true,
                       pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
                   },

                   legend: {
                       align: 'center',
                       verticalAlign: 'bottom',
                       layout: 'horizontal'
                   },

                   series: [{
                       name: qb.display.split(' -')[0],
                       data: displayData[0],
                       pointPlacement: 'on',
                       color: $scope.teamColors[qb.cteam]
                   }, {
                       name: qb.def,
                       data: displayData[1],
                       pointPlacement: 'on',
                       color: $scope.teamColors[qb.def]
                   }, {
                       name: 'League Average',
                       data: displayData[2],
                       pointPlacement: 'on',
                       dashStyle: 'shortdash'
                   }]
               })
            },0)
        })
    }
}