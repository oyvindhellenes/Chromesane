'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('Chromesane')
	.controller('HomeCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', '$cookieStore',
		function($scope, $log, $http, $rootScope, userService, authService, $cookieStore) {

        $scope.loginCredentials = {};
        $scope.registerCredentials = {};
        $scope.validationErrors = [];

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

		$scope.login = function(credentials){
			var success = function(data){
                console.log('data' + angular.toJson(data));

                $rootScope.isLoggedIn = true;

                // Store the oauth data
                $rootScope.oauth = data;

                // Also store it in cookie
                $cookieStore.put('oauth', data);

                userService.user(data.user[0].id)
                .success(function (resp){
                    console.log('resp' + angular.toJson(resp));
                    $rootScope.user = resp;

                })
                .error(function (resp){
                    $log.info('Not working');
                });
                
                //$state.go('home');
			};

			var loginError = function(err) {
                $scope.validationErrors = [];
                $scope.validationErrors.push("Incorrect username/password combination.");
            };

			// Sends credentials with responses to the authentication service
			authService.login(credentials).success(success).error(loginError);
		};	

	}]);