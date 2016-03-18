angular.module('PlayersApp').controller('chartController', ['$scope', chartController]);

function chartController ($scope) {
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
        $(function() {
            setTimeout(function(){
                $('#' + wr.player).highcharts({
                    credits: {
                        enabled: false
                    },
                    chart: {
                        polar: true,
                        type: 'line'
                    },

                    title: {
                        text: 'Receiving Yards Per Target'
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
                        data: [
                            Math.floor(wr.dmYds / wr.dmTrg * 100) / 100 || 0,
                            Math.floor(wr.drYds / wr.drTrg * 100) / 100 || 0,
                            Math.floor(wr.srYds / wr.srTrg * 100) / 100 || 0,
                            Math.floor(wr.smYds / wr.smTrg * 100) / 100 || 0,
                            Math.floor(wr.slYds / wr.slTrg * 100) / 100 || 0,
                            Math.floor(wr.dlYds / wr.dlTrg * 100) / 100 || 0
                        ],
                        pointPlacement: 'on',
                        color: $scope.teamColors[wr.cteam]
                    }, {
                        name: wr.defense + ' v. ' + wr.posd + '-' + wr.dcp + 's',
                        data: [
                            Math.floor(wr.defDmYds / wr.defDmAtt * 100) / 100 || 0,
                            Math.floor(wr.defDrYds / wr.defDrAtt * 100) / 100 || 0,
                            Math.floor(wr.defSrYds / wr.defSrAtt * 100) / 100 || 0,
                            Math.floor(wr.defSmYds / wr.defSmAtt * 100) / 100 || 0,
                            Math.floor(wr.defSlYds / wr.defSlAtt * 100) / 100 || 0,
                            Math.floor(wr.defDlYds / wr.defDlAtt * 100) / 100 || 0
                        ],
                        pointPlacement: 'on',
                        color: $scope.teamColors[wr.defense]
                    }, {
                        name: 'League Average v. ' + wr.posd + '-' + wr.dcp + 's',
                        data: [
                            wr.leagueAvg[0] || 0,
                            wr.leagueAvg[1] || 0,
                            wr.leagueAvg[2] || 0,
                            wr.leagueAvg[3] || 0,
                            wr.leagueAvg[4] || 0,
                            wr.leagueAvg[5] || 0
                        ],
                        pointPlacement: 'on',
                        dashStyle: 'shortdash'
                    }]
                })
            },0)
        })
    };
    $scope.buildRbChart = function (rb) {
        $(function () {
            setTimeout(function () {
                $('#' + rb.player).highcharts(
                    {
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Rushing Yards Per Attempt'
                        },
                        xAxis: {
                            categories: ['Left End', 'Left Tackle', 'Left Guard', 'Middle', 'Right Guard', 'Right Tackle', 'Right End']
                        },
                        series: [
                            {
                                type: 'column',
                                name: rb.display.split(' -')[0],
                                data: [
                                    Math.floor(rb.leYds / rb.leAtt * 100) / 100 || 0,
                                    Math.floor(rb.ltYds / rb.ltAtt * 100) / 100 || 0,
                                    Math.floor(rb.lgYds / rb.lgAtt * 100) / 100 || 0,
                                    Math.floor(rb.mdYds / rb.mdAtt * 100) / 100 || 0,
                                    Math.floor(rb.rgYds / rb.rgAtt * 100) / 100 || 0,
                                    Math.floor(rb.rtYds / rb.rtAtt * 100) / 100 || 0,
                                    Math.floor(rb.reYds / rb.rtAtt * 100) / 100 || 0
                                ],
                                color: $scope.teamColors[rb.cteam]
                            },
                            {
                                type: 'column',
                                name: rb.defense,
                                data: [
                                    Math.floor(rb.defLeYds / rb.defLeAtt * 100) / 100 || 0,
                                    Math.floor(rb.defLtYds / rb.defLtAtt * 100) / 100 || 0,
                                    Math.floor(rb.defLgYds / rb.defLgAtt * 100) / 100 || 0,
                                    Math.floor(rb.defMdYds / rb.defMdAtt * 100) / 100 || 0,
                                    Math.floor(rb.defRgYds / rb.defRgAtt * 100) / 100 || 0,
                                    Math.floor(rb.defRtYds / rb.defRtAtt * 100) / 100 || 0,
                                    Math.floor(rb.defReYds / rb.defRtAtt * 100) / 100 || 0
                                ],
                                color: $scope.teamColors[rb.defense]
                            },
                            {
                                type: 'spline',
                                name: 'League Average',
                                data: [
                                    5.13,
                                    4.15,
                                    4.14,
                                    3.90,
                                    3.93,
                                    4.34,
                                    4.90
                                ],
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
        $(function() {
            setTimeout(function(){
               $('#' + qb.player).highcharts({
                   credits: {
                       enabled: false
                   },
                   chart: {
                       polar: true,
                       type: 'line'
                   },

                   title: {
                       text: 'Passing Yards Per Attempt'
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
                       data: [
                           Math.floor(qb.dmYds / qb.dmAtt * 100) / 100 || 0,
                           Math.floor(qb.drYds / qb.drAtt * 100) / 100 || 0,
                           Math.floor(qb.srYds / qb.srAtt * 100) / 100 || 0,
                           Math.floor(qb.smYds / qb.smAtt * 100) / 100 || 0,
                           Math.floor(qb.slYds / qb.slAtt * 100) / 100 || 0,
                           Math.floor(qb.dlYds / qb.dlAtt * 100) / 100 || 0
                       ],
                       pointPlacement: 'on',
                       color: $scope.teamColors[qb.cteam]
                   }, {
                       name: qb.defense,
                       data: [
                           Math.floor(qb.defDmYds / qb.defDmAtt * 100) / 100 || 0,
                           Math.floor(qb.defDrYds / qb.defDrAtt * 100) / 100 || 0,
                           Math.floor(qb.defSrYds / qb.defSrAtt * 100) / 100 || 0,
                           Math.floor(qb.defSmYds / qb.defSmAtt * 100) / 100 || 0,
                           Math.floor(qb.defSlYds / qb.defSlAtt * 100) / 100 || 0,
                           Math.floor(qb.defDlYds / qb.defDlAtt * 100) / 100 || 0
                       ],
                       pointPlacement: 'on',
                       color: $scope.teamColors[qb.defense]
                   }, {
                       name: 'League Average',
                       data: [
                           13.45,
                           10.95,
                           5.84,
                           7.61,
                           6.07,
                           11.24
                       ],
                       pointPlacement: 'on',
                       dashStyle: 'shortdash'
                   }]
               })
            },0)
        })
    }
}