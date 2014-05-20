'use strict';

angular
	.module('Chromesane', ['ui.bootstrap']);

angular.module('Chromesane')
	.controller('SubmitCtrl', function($scope, $log, $http) {

		var name = '';
		var url = '';
		chrome.tabs.query({
			currentWindow: true,
			active: true
		}, function(tabs) {
			$scope.resourceURL = tabs[0].url;
			$log.info('Funker det?');
		});

		$scope.submit = function() {
			name = $scope.resourceName;
			url = $scope.resourceURL;
			$log.info(url);
			$log.info(name);
			var url = 'http://localhost:8888/Corsane/web/app_dev.php/api/resources?name=' + name + '&url=' + url;
			$http.post(url).success(function(data) {

			}).error(function(error) {
				$log.info('It doesnt work!'+ error);
			});
			window.close();
		};

	});