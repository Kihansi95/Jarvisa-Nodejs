var app = angular.module('app', ['ngResource', 'angularMoment', 'ngAnimate']);

app.controller('DataCtrl', ['$scope', '$resource', '$timeout', '$http', function($scope, $resource, $timeout, $http) {
	
	$scope.dataEntries = $resource('/api/data').query();
	
	
	
	io.socket.get('/ws/data', function(data, jwr) {
		io.socket.on('create', function(new_data) {
			
			$timeout(function() {
				$scope.dataEntries.unshift(new_data);
			});
		});
		
		io.socket.on('delete', function(deleted_data) {
			$timeout(function() {
				/*
				let data = $scope.dataEntries.filter(function (item) {
					return item === deleted_data.id;
				})[0];
				*/
				let index = $scope.dataEntries.findIndex( data => data.id === deleted_data.id );
				$scope.dataEntries.splice(index, 1);
			});
			
		});
	});
	
	$scope.remove = function(data) {
		
		$http.delete('/api/data/'+data.id).then(function(data) {
			console.log('http delete ', data)
		}).catch(function(err) {
			console.log('error on http delete ', err);
		})
	};
	
	$scope.create = function(data) {
		$http.put('/api/data/', data).then(function(data) {
			console.log('http create ', data);
		}).catch(function(err) {
			console.log('error on http create ', err);
		})
	};
}]);
