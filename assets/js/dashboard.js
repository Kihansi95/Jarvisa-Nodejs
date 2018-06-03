var app = angular.module('app', ['ngResource', 'angularMoment', 'ngAnimate', 'chart.js']);

app.controller('DataCtrl', ['$scope', '$resource', '$timeout', '$http', function($scope, $resource, $timeout, $http) {
	
	$scope.dataEntries = $resource('/api/data').query();
	$scope.statistic = $resource('/api/statistic').query();
	
	// chart
	$scope.labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	$scope.option = {
		responsive: true,
		title: {
			display: 'true',
			text: 'Temperature evolution'
		},
		hover: {
			mode: 'nearest',
			intersect : 'true'
		},
		scale: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Time'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				}
			}]
		}
	};
	$scope.datasets = {
		label: 'temperature value',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data : $scope.dataEntries,
			fill: 'origine'
	};
	
	// websocket
	io.socket.get('/ws/data', function(data, jwr) {
		io.socket.on('create', function(new_data) {
			
			$timeout(function() {
				$scope.dataEntries.unshift(new_data);
				$scope.statistic.push(new_data.value);
			});
		});
		
		io.socket.on('delete', function(deleted_data) {
			$timeout(function() {
				let index = $scope.dataEntries.findIndex( data => data.id === deleted_data.id );
				$scope.dataEntries.splice(index, 1);
			});
			
		});
	});
	
	$scope.remove = function(data) {
		
		$http.delete('/api/data'+(data === undefined ? '' : '/' + data.id )).then(function(data) {
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
