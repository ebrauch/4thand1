//var app = angular.module('app', []);
//
//app.controller('analyze-controller', ['$scope', '$http', function($scope){
//    $scope.addPlayer = {};
//    var options = {
//        url: "public/players.json",
//        getValue: "display",
//        list: {
//            match: {
//                enabled: true
//            },
//            onSelectItemEvent: function() {
//                $scope.addPlayer = $("#players").getSelectedItemData();
//            }
//        },
//        //theme: "square"
//    };
//    $("#players").easyAutocomplete(options);
//    $scope.newPlayer = function() {
//        console.log($scope.addPlayer);
//    }
//}])