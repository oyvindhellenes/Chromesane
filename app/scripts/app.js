'use strict';

angular
	.module('Chromesane', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngResource'])
	  .constant('config', {
      baseUrl: 'http://localhost:1337/'
    })
	.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('submit', {
        url: '/submit',
        templateUrl: 'popup.html',
        controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'popup.html',
            controller: 'HomeCtrl'
        })

    $httpProvider.interceptors.push('httpInterceptor');
  }
])
  .run(['$rootScope', '$injector','$location','authService','$state', '$cookieStore', 'userService', 
  	function ($rootScope, $injector, $location, authService, $state, $cookieStore, userService) {

    // Injects the authorization header on each api call
    $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
        if (userService.isLoggedIn()) {
            headersGetter()['Authorization'] = 'Bearer ' + $rootScope.oauth.access_token;
        }

        if (data) {
            return data;
        }
    };

    // If already logged in
    if ($cookieStore.get('oauth')) {
        $rootScope.isLoggedIn = true;
        console.log('Already logged in. Setting oauth from cookie');
        console.log($cookieStore.get('oauth'));
        $rootScope.oauth = $cookieStore.get('oauth');

        if ($rootScope.oauth.user) {
            userService.user($rootScope.oauth.user[0].id).success(function (resp){
                console.log('Setting user from userService.user() ');
                $rootScope.user = resp;
                $rootScope.collection.value = $rootScope.user.collections[0]

            }).error(function () {
                console.log('Is already logged in but unable to get userdata');
            });
            
        }
        else {
            $cookieStore.remove('oauth');
            $rootScope.isLoggedIn = false;
        }
    };

}]);

