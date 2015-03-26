'use strict';

var app = angular.module('colorChooser', ['ngResource']);

app.controller('MainController', ['$scope', '$interpolate', 'ColorService', function($scope, $interpolate, ColorService) {

    $scope.active = 'links';

    $scope.linkOneHover = false;

    $scope.menuLink = false;

    $scope.save = function() {
        ColorService.save($scope.site);
    };

    $scope.test1 = "It Worked";
    $scope.test2 = "huray";

    $scope.tryThis = function() {
        var exp = $interpolate(css);
        var result = exp($scope);
        console.log(result);
    };


    ColorService.get().$promise.then(function(data) {
        $scope.site = data;
        $scope.link = {color : $scope.site.links.main};
        $scope.buttonContinue = {background : $scope.site.buttons.continue.main, color : $scope.site.buttons.continue.text};
        $scope.buttonSubmit = {background : $scope.site.buttons.submit.main, color : $scope.site.buttons.submit.text};
        $scope.buttonCancel = {background : $scope.site.buttons.cancel.main, color : $scope.site.buttons.cancel.text};
        $scope.navLink = {color : $scope.site.navbar.links.main};
        $scope.navLinkHover={color : $scope.site.navbar.links.hover}
        $scope.navbarColor = {background : $scope.site.navbar.color, border:'3px solid ' + $scope.site.navbar.border}
        $scope.navbarBrand = {color : $scope.site.navbar.brand}
    });

}]);

app.factory('ColorService', ['$resource', function($resource){

    return $resource('http://localhost:8080/color');

}]);
