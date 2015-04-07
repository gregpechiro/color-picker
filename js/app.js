'use strict';

var app = angular.module('colorChooser', [
	'ngResource',
	'ngRoute',
	'controllers',
	'services',
	'directives'
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
		.when('/color/:userId', {
			resolve: {
		        factory: checkAdmin
		    },
            templateUrl: 'color.html',
            controller: 'ColorController'
        })
		.when ('/css/:userId', {
			resolve: {
		        factory: checkAdmin
		    },
			templateUrl: 'css.html',
			controller: 'CssController'
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
		.when('/test/:page', {
			resolve: {
			    factory: checkAuth
			},
			templateUrl: function(parameters) {
				return 'test/' + parameters.page;
			},
			controller: 'PreviewController'
		})
		.when('/blog/:page', {
			resolve: {
			    factory: checkAuth
			},
			templateUrl: function(parameters) {
				return 'blog/' + parameters.page;
			},
			controller: 'PreviewController',
			css: [
				'blog/css/clean-blog.min.css',
				'http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css',
				'http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
				'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
			]
		})
		.when('/business/:page', {
			resolve: {
			    factory: checkAuth
			},
			templateUrl: function(parameters) {
				return 'business/' + parameters.page;
			},
			controller: 'PreviewController',
			css: [
				'business/css/modern-business.css',
			]
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
