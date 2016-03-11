angular.module('PlayersApp').controller('chartController', ['$scope', chartController]);

function chartController ($scope) {
    $scope.buildWrChart = function(wr) {
        $(function () {
            setTimeout(function(){$('#' + wr.player).highcharts(
                {
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Receiving Yards Per Target'
                    },
                    xAxis: {
                        categories: ['Short Left', 'Short Middle', 'Short Right', 'Deep Left', 'Deep Middle', 'Deep Right']
                    },
                    series: [
                        {
                            type: 'column',
                            name: wr.display.split(' -')[0],
                            data: [
                                Math.floor(wr.slYds / wr.slTrg * 100) / 100,
                                Math.floor(wr.smYds / wr.smTrg * 100) / 100,
                                Math.floor(wr.srYds / wr.srTrg * 100) / 100,
                                Math.floor(wr.dlYds / wr.dlTrg * 100) / 100,
                                Math.floor(wr.dmYds / wr.dmTrg * 100) / 100,
                                Math.floor(wr.drYds / wr.drTrg * 100) / 100,
                            ]
                        },
                        {
                            type: 'column',
                            name: wr.defense,
                            data: [
                                Math.floor(wr.defSlYds / wr.defSlTrg * 100) / 100,
                                Math.floor(wr.defSmYds / wr.defSmTrg * 100) / 100,
                                Math.floor(wr.defSrYds / wr.defSrTrg * 100) / 100,
                                Math.floor(wr.defDlYds / wr.defDlTrg * 100) / 100,
                                Math.floor(wr.defDmYds / wr.defDmTrg * 100) / 100,
                                Math.floor(wr.defDrYds / wr.defDrTrg * 100) / 100
                            ]
                        },
                        {
                            type: 'spline',
                            name: 'League Average',
                            data: [
                                $scope.leagueAvgSlYds,
                                $scope.leagueAvgSmYds,
                                $scope.leagueAvgSrYds,
                                $scope.leagueAvgDlYds,
                                $scope.leagueAvgDmYds,
                                $scope.leagueAvgDrYds
                            ],
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3],
                                fillColor: 'white'
                            }
                        },
                        //    {
                        //    type: 'pie',
                        //    name: 'Total Rushing YPG',
                        //    data: [{
                        //        name: rb.display.split(' -')[0],
                        //        y: (rb.leYds + rb.ltYds + rb.lgYds + rb.mdYds + rb.rgYds + rb.rtYds + rb.reYds) / 16,
                        //        color: Highcharts.getOptions().colors[0]
                        //    }, {
                        //        name: rb.defense,
                        //        y: (rb.defLeYds + rb.defLtYds + rb.defLgYds + rb.defMdYds + rb.defRgYds + rb.defRtYds + rb.defReYds) / 16,
                        //        color: Highcharts.getOptions().colors[1]
                        //    },
                        //        {
                        //        name: 'League Average',
                        //        y: ($scope.leagueAvgLeYds + $scope.leagueAvgLtYds + $scope.leagueAvgLgYds + $scope.leagueAvgMdYds +
                        //            $scope.leagueAvgRgYds + $scope.leagueAvgRtYds + $scope.leagueAvgReYds),
                        //        color: Highcharts.getOptions().colors[2]
                        //    }
                        //    ],
                        //    center: [25, 25],
                        //    size: 33,
                        //    showInLegend: false,
                        //    dataLabels: {
                        //        enabled: false
                        //    }
                        //
                        //}
                    ]
                })},0);
        })
    }
    $scope.buildRbChart = function(rb) {
        $(function () {
            setTimeout(function(){$('#' + rb.player).highcharts(
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
                                Math.floor(rb.leYds / rb.leAtt * 100) / 100,
                                Math.floor(rb.ltYds / rb.ltAtt * 100) / 100,
                                Math.floor(rb.lgYds / rb.lgAtt * 100) / 100,
                                Math.floor(rb.mdYds / rb.mdAtt * 100) / 100,
                                Math.floor(rb.rgYds / rb.rgAtt * 100) / 100,
                                Math.floor(rb.rtYds / rb.rtAtt * 100) / 100,
                                Math.floor(rb.reYds / rb.rtAtt * 100) / 100
                            ]
                        },
                        {
                            type: 'column',
                            name: rb.defense,
                            data: [
                                Math.floor(rb.defLeYds / rb.defLeAtt * 100) / 100,
                                Math.floor(rb.defLtYds / rb.defLtAtt * 100) / 100,
                                Math.floor(rb.defLgYds / rb.defLgAtt * 100) / 100,
                                Math.floor(rb.defMdYds / rb.defMdAtt * 100) / 100,
                                Math.floor(rb.defRgYds / rb.defRgAtt * 100) / 100,
                                Math.floor(rb.defRtYds / rb.defRtAtt * 100) / 100,
                                Math.floor(rb.defReYds / rb.defRtAtt * 100) / 100
                            ]
                        },
                        {
                            type: 'spline',
                            name: 'League Average',
                            data: [
                                $scope.leagueAvgLeYds,
                                $scope.leagueAvgLtYds,
                                $scope.leagueAvgLgYds,
                                $scope.leagueAvgMdYds,
                                $scope.leagueAvgRgYds,
                                $scope.leagueAvgRtYds,
                                $scope.leagueAvgReYds
                            ],
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3],
                                fillColor: 'white'
                            }
                        },
                        //    {
                        //    type: 'pie',
                        //    name: 'Total Rushing YPG',
                        //    data: [{
                        //        name: rb.display.split(' -')[0],
                        //        y: (rb.leYds + rb.ltYds + rb.lgYds + rb.mdYds + rb.rgYds + rb.rtYds + rb.reYds) / 16,
                        //        color: Highcharts.getOptions().colors[0]
                        //    }, {
                        //        name: rb.defense,
                        //        y: (rb.defLeYds + rb.defLtYds + rb.defLgYds + rb.defMdYds + rb.defRgYds + rb.defRtYds + rb.defReYds) / 16,
                        //        color: Highcharts.getOptions().colors[1]
                        //    },
                        //        {
                        //        name: 'League Average',
                        //        y: ($scope.leagueAvgLeYds + $scope.leagueAvgLtYds + $scope.leagueAvgLgYds + $scope.leagueAvgMdYds +
                        //            $scope.leagueAvgRgYds + $scope.leagueAvgRtYds + $scope.leagueAvgReYds),
                        //        color: Highcharts.getOptions().colors[2]
                        //    }
                        //    ],
                        //    center: [25, 25],
                        //    size: 33,
                        //    showInLegend: false,
                        //    dataLabels: {
                        //        enabled: false
                        //    }
                        //
                        //}
                    ]
                })},0);
        })
    }
    $scope.buildQbChart = function(qb) {
        $(function () {
            setTimeout(function(){$('#' + qb.player).highcharts(
                {
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Passing Yards Per Attempt'
                    },
                    xAxis: {
                        categories: ['Short Left', 'Short Middle', 'Short Right', 'Deep Left', 'Deep Middle', 'Deep Right']
                    },
                    series: [
                        {
                            type: 'column',
                            name: qb.display.split(' -')[0],
                            data: [
                                Math.floor(qb.slYds / qb.slAtt * 100) / 100,
                                Math.floor(qb.smYds / qb.smAtt * 100) / 100,
                                Math.floor(qb.srYds / qb.srAtt * 100) / 100,
                                Math.floor(qb.dlYds / qb.dlAtt * 100) / 100,
                                Math.floor(qb.dmYds / qb.dmAtt * 100) / 100,
                                Math.floor(qb.drYds / qb.drAtt * 100) / 100,
                            ]
                        },
                        {
                            type: 'column',
                            name: qb.defense,
                            data: [
                                Math.floor(qb.defSlYds / qb.defSlTrg * 100) / 100,
                                Math.floor(qb.defSmYds / qb.defSmTrg * 100) / 100,
                                Math.floor(qb.defSrYds / qb.defSrTrg * 100) / 100,
                                Math.floor(qb.defDlYds / qb.defDlTrg * 100) / 100,
                                Math.floor(qb.defDmYds / qb.defDmTrg * 100) / 100,
                                Math.floor(qb.defDrYds / qb.defDrTrg * 100) / 100
                            ]
                        },
                        {
                            type: 'spline',
                            name: 'League Average',
                            data: [
                                $scope.leagueAvgSlYds,
                                $scope.leagueAvgSmYds,
                                $scope.leagueAvgSrYds,
                                $scope.leagueAvgDlYds,
                                $scope.leagueAvgDmYds,
                                $scope.leagueAvgDrYds
                            ],
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3],
                                fillColor: 'white'
                            }
                        },
                        //    {
                        //    type: 'pie',
                        //    name: 'Total Rushing YPG',
                        //    data: [{
                        //        name: rb.display.split(' -')[0],
                        //        y: (rb.leYds + rb.ltYds + rb.lgYds + rb.mdYds + rb.rgYds + rb.rtYds + rb.reYds) / 16,
                        //        color: Highcharts.getOptions().colors[0]
                        //    }, {
                        //        name: rb.defense,
                        //        y: (rb.defLeYds + rb.defLtYds + rb.defLgYds + rb.defMdYds + rb.defRgYds + rb.defRtYds + rb.defReYds) / 16,
                        //        color: Highcharts.getOptions().colors[1]
                        //    },
                        //        {
                        //        name: 'League Average',
                        //        y: ($scope.leagueAvgLeYds + $scope.leagueAvgLtYds + $scope.leagueAvgLgYds + $scope.leagueAvgMdYds +
                        //            $scope.leagueAvgRgYds + $scope.leagueAvgRtYds + $scope.leagueAvgReYds),
                        //        color: Highcharts.getOptions().colors[2]
                        //    }
                        //    ],
                        //    center: [25, 25],
                        //    size: 33,
                        //    showInLegend: false,
                        //    dataLabels: {
                        //        enabled: false
                        //    }
                        //
                        //}
                    ]
                })},0);
        })
    }
}