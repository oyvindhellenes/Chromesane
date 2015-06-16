'use strict';
/**
 * Factory for authentication. Not implemented backend yet.
 *
 * @author Øyvind Hellenes
 */
angular.module('Chromesane')
  .factory('authService', ['$http', 'config','$rootScope',
    function($http, config, $rootScope) {
      return {
        login: function(credentials) {
            var loginString = config.baseUrl
                + 'auth/login';

            return $http({
                method: 'POST',
                url: loginString,
                data: $.param({password: credentials.password, username: credentials.email}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })

        },
        logout: function(){
            var loginString = config.baseUrl
                + 'auth/logout';
                        
            return $http.get(loginString);
        }
      }
    }
  ]);