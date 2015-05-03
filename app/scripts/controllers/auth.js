'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('Chromesane')
	.controller('HomeCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', '$cookieStore', 'submitService',
		function($scope, $log, $http, $rootScope, userService, authService, $cookieStore, submitService) {

        $scope.loginCredentials = {};
        $scope.registerCredentials = {};
        $scope.validationErrors = [];

        $scope.resource = {
            name: "",
            url: "",
        }

        $rootScope.collection = {
            value: ""
        }

        chrome.tabs.query({
        	currentWindow: true,
        	active: true
        }, function(tabs) {
        	$scope.resource.url = tabs[0].url;
        	$log.info('Funker det?');
        });

        $scope.submit = function() {
        	
            $log.info('1' + $scope.resource.url);
            $log.info('2' + $scope.resource.name);
            $log.info('3' + $rootScope.collection.value);

         //    submitService.post($rootScope.resource.url, $rootScope.resource.name).then(function(data){
         //        submitService.add_resource($rootScope.resource.collection.id, data.id);
         //    })

        	// window.close();
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
                    $rootScope.collection.value = $rootScope.user.collections[0]

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