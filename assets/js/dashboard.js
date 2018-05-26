var app = angular.module('app', ['ngResource', 'angularMoment', 'ngAnimate']);

app.controller('DataCtrl', ['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
	
	$scope.dataEntries = $resource('/data').query();
	
	io.socket.get('/ws/data/subscribe', function(data, jwr) {
		
		io.socket.on('new_entry', function(new_data) {
			
			$timeout(function() {
				$scope.dataEntries.unshift(new_data);
			});
		});
		
	});
}]);
