angular.module('PlayersApp').controller('chartController', ['$scope', chartController]);

function chartController($scope) {
    $scope.RB = {
        title: {
            text: 'Rushing Yards Per Game'
        },
        xAxis: {
            categories: ['Left End', 'Left Tackle', 'Left Guard', 'Middle', 'Right Guard', 'Right Tackle', 'Right End']
        },
        labels: {
            items: [{
                html: 'Total yards',
                style: {
                    left: '0px',
                    top: '0px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'C.J. Anderson',
            data: [11, 10.2, 8.8, 12.5, 13, 15.8, 11.3]
        }, {
            type: 'column',
            name: 'PIT',
            data: [10.6, 9.8, 10.5, 16.4, 17, 12.3, 9.6]
        },  {
            type: 'spline',
            name: 'League Average',
            data: [11.6, 11, 11.5, 15.9, 19, 13.6, 8.3],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total rushing yards',
            data: [{
                name: 'C.J. Anderson',
                y: 73,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'PIT',
                y: 89,
                color: Highcharts.getOptions().colors[1] // John's color
            }, {
                name: 'League Average',
                y: 78,
                color: Highcharts.getOptions().colors[2] // Joe's color
            }],
            center: [25, 25],
            size: 33,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    }
}