'use strict';

/**
 * Factory for handling resources
 *
 * @author Øyvind Hellenes
 */
angular.module('Chromesane')
  .factory('submitService', ['$http', '$log', '$resource', 'config','$rootScope', '$q',
    function($http, $log, $resource, config, $rootScope, $q) {

      return {
        post: function(url, note, collection) {
          var q = $q.defer();
          collection.resources_length++;
          // Post resource
          $http.post(config.baseUrl + 'resource?poster_name=' + $rootScope.user.fullName + '&index=' + collection.resources_length + '&url=' + url + '&poster_id=' + $rootScope.user.id + '&poster_img=' + $rootScope.user.image_url + '&master=true&note=' + note).success(function(data) {
            q.resolve(data);

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;

        },
        add_resource: function(collection, resource){
          $http.post(config.baseUrl + 'collection/addresource?collection_id='+ collection.id +'&resource_id=' + resource.id + '&poster_id=' + $rootScope.user.id + '&master=true').success(function(data) {
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },


      }
    }
  ]);