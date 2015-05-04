'use strict';
/**
 * Factory for authentication. Not implemented backend yet.
 *
 * @author Øyvind Hellenes
 */
angular.module('Chromesane')
  .factory('userService', ['$http', 'config','$rootScope','$resource','$log', '$q',
    function($http, config, $rootScope, $resource, $log, $q) {
      return {
        user: function(id){
            var userString = config.baseUrl
                + 'user/'+ id;

            return $http.get(userString);

        },
        isLoggedIn: function() {
            return $rootScope.isLoggedIn;
        }
      }
    }
  ]);
