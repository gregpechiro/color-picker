
var services = angular.module('services', ['ngResource', 'ngCookies']);

services.factory('ColorService', ['$resource', function($resource){

    return $resource('http://localhost:8080/color/:userId');

}]);

services.factory('UserService', ['$resource', function($resource){

    return $resource('http://localhost:8080/user/:userId');

}]);

services.factory('LoginService', ['$http', '$cookieStore', '$resource', function($http, $cookieStore, $resource) {

    var adminLogin = function() {
        var user = {
            username:'admin',
            password:'admin',
            role:'ROLE_ADMIN'
        };
        $cookieStore.put('user', user);
    };

    // mock login service method would call database here
    var login = function(username, password) {
        var promise = $http.get('http://localhost:8080/user/login', {
                params: {
                    'username': username,
                    'password': password
                }
            })
            .then(function(response) {
                if (response.data != null && JSON.stringify(response.data) != '{}' && response.data != '') {
                    $cookieStore.put('user', response.data);
                    return true;
                } else {
                    return false;
                }
            });
        return promise;
    };

    return {
        login : login,
        adminLogin:adminLogin
    }

}]);

services.factory('LogoutService', ['$cookieStore', function($cookieStore) {
    return function() {
        $cookieStore.remove('user');
    }
}]);
