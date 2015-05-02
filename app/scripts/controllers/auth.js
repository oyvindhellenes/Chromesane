'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('Chromesane')
	.controller('AuthCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', 
		function($scope, $log, $http, $rootScope, userService, authService) {

        $scope.loginCredentials = {};
        $scope.registerCredentials = {};
        $scope.validationErrors = [];

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