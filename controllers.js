
var controllers = angular.module('controllers', []);

controllers.controller('UserController', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {

    $rootScope.genCss= '';

    $scope.users = UserService.query();

    $scope.edit = function(userId) {
	    $scope.user = UserService.get({userId:userId});
	};

    $scope.delete = function(userId) {
        console.log(userId);
	    UserService.delete({userId:userId}).$promise.then(function() {
            $scope.users = UserService.query();
        });
	}

    $scope.clear = function() {
        $scope.user = {};
    };

    $scope.save = function() {
        UserService.save($scope.user).$promise.then(function() {
            $scope.users = UserService.query();
            $scope.user = {};
        });
    }
}]);

controllers.controller('ColorController', ['$scope', '$rootScope', '$interpolate', 'ColorService', '$routeParams',
    function($scope, $rootScope, $interpolate, ColorService, $routeParams) {

    $rootScope.genCss= '';

    $scope.active = 'links';

    $scope.site = {};

    $scope.linkOneHover = false;

    $scope.menuLink = false;

    $scope.save = function() {
        ColorService.save($scope.site).$promise.then(function() {
            $scope.site = ColorService.get({userId: $routeParams.userId});
            $scope.message = "Successfully saved colors"
        });
    };

    $scope.test1 = "It Worked";
    $scope.test2 = "huray";

    // $scope.tryThis = function() {
    //     var exp = $interpolate(css);
    //     var result = exp($scope);
    //     console.log(result);
    // };

    ColorService.get({userId: $routeParams.userId}).$promise.then(function(data) {
        if (data.userId != null) {
            $scope.site = data;
            $scope.link = {color : $scope.site.links.main};
            $scope.buttonContinue = {background : $scope.site.buttons.continue.main, color : $scope.site.buttons.continue.text};
            $scope.buttonSubmit = {background : $scope.site.buttons.submit.main, color : $scope.site.buttons.submit.text};
            $scope.buttonCancel = {background : $scope.site.buttons.cancel.main, color : $scope.site.buttons.cancel.text};
            $scope.navLink = {color : $scope.site.navbar.links.main};
            $scope.navLinkHover={color : $scope.site.navbar.links.hover}
            $scope.navbarColor = {background : $scope.site.navbar.color, border:'3px solid ' + $scope.site.navbar.border}
            $scope.navbarBrand = {color : $scope.site.navbar.brand}
        } else {
            $scope.site.userId = $routeParams.userId;
        }
    });

}]);

controllers.controller('LoginController', ['$location', '$scope', '$rootScope', '$cookieStore', 'LoginService',
    function($location, $scope, $rootScope, $cookieStore, LoginService) {

    var user = $cookieStore.get('user');
    if (user != undefined) {
        if (user.role == 'ROLE_ADMIN') {
            $location.path('/admin');
        } else{
            $location.path('/test/' + user.id + '/test');
        }
    }

    $rootScope.genCss= '';

    $scope.login = function() {
        if ($scope.username == 'admin' && $scope.password == 'admin') {
            LoginService.adminLogin();
             $location.path('/admin');
        } else {
            LoginService.login($scope.username, $scope.password).then(function(data) {
                if (data) {
                    var user = $cookieStore.get('user');
                    if (user.role == 'ROLE_ADMIN') {
                        $location.path('/admin');
                    } else{
                        $location.path('/test/' + user.id);
                    }
                } else {
                    $scope.err = true;
                }
            });
        }
    }

    $scope.err = false;
}]);


controllers.controller('TestController', ['$scope', '$rootScope', '$interpolate', 'ColorService', '$routeParams',
    function($scope, $rootScope, $interpolate, ColorService, $routeParams) {

    if ($rootScope.genCss == '' || $rootScope.genCss == null) {
        ColorService.get({userId: $routeParams.userId}).$promise.then(function(data) {
            $scope.site = data;
            var exp = $interpolate(css);
            $rootScope.genCss = exp($scope);
        });
    }
}]);
