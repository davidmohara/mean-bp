angular.module('appname', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'angularMoment']);

angular.module('appname').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/index.html'
            }).
            otherwise({
                redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('appname').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
