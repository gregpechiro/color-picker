'use strict';

var app = angular.module('colorChooser', [
	'ngResource',
	'ngRoute',
	'controllers',
	'services'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'login.html',
		    controller: 'LoginController'
		})
		.when('/admin', {
			resolve: {
		        factory: checkAdmin
		    },
			templateUrl: 'user.html',
			controller: 'UserController'

		})
		.when('/test/:userId/:page', {
			resolve: {
			    factory: checkAuth
			},
			templateUrl: function(parameters) {
				return 'test/' + parameters.page + '.html';
			},
			controller: 'TestController'
		})
        .when('/color/:userId', {
			resolve: {
		        factory: checkAdmin
		    },
            templateUrl: 'color.html',
            controller: 'ColorController'
        })
		.when('/error', {
		    templateUrl: 'error.html'
		})
		.when('/logout', {
		    resolve: {
		        factory : logout
		    },
		    redirectTo : '/'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

var checkAuth = function($cookieStore, $location) {
    var user = $cookieStore.get('user')
    if (user != null && user != {}) {
        return true;
    } else {
        $location.path('/');
    }
};

var checkAdmin = function($cookieStore, $location) {
    var user = $cookieStore.get('user');
    if (user != null && user != {}) {
        if (user.role == 'ROLE_ADMIN') {
            return true;
        } else {
            $location.path('/error');
        }
    } else {
        $location.path('/');
    }
}

var logout = function($cookieStore) {
    $cookieStore.remove('user');
};
