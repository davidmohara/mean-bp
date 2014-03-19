angular.module('appname').factory("alertService", ['$rootScope', '$timeout', function($rootScope, $timeout){
	var alertService = {};

	$rootScope.alerts = [];

	alertService.add = function(type, message, timeout){
		$rootScope.alerts.push({
			type: type,
			message: message,
			close: function(){
				alertService.closeAlert(this);
			}
		});

		if (timeout){
			$timeout(function(){
				alertService.closeAlert(this);
			}, timeout);
		}
	};

	alertService.closeAlert = function(alert){
		return $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
	};

	return alertService;
}]);
