angular.module('appname').controller('HeaderController', ['$scope', function ($scope) {

    $scope.menu = [
    {
        'title': 'First',
        'link': 'first'
    },
    {
        'title': 'Second',
        'link': 'second'
    }
    ];

    $scope.isCollapsed = false;
}]);
