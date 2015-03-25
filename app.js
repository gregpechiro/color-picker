'use strict';

var app = angular.module('colorChooser', ['ngResource']);

app.controller('MainController', ['$scope', 'ColorService', function($scope, ColorService) {

    $scope.active = 'links';

    $scope.linkOneHover = false;

    $scope.menuLink = false;

    $scope.save = function() {
        ColorService.save($scope.site);
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
