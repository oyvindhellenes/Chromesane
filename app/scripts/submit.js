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
          if (!collection.resources_length) {
            collection.resources_length = 1;
          }
          else {
            collection.resources_length++;
            
          }
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
        new_collection: function(name){
          var q = $q.defer();
          $http.post(config.baseUrl + 'collection/create?name='+ name +'&poster=' + $rootScope.user.id).success(function(data) {
            q.resolve(data);
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;
        },
        star: function(collection){
          $http.post(config.baseUrl + 'user/star?id='+ $rootScope.user.id +'&collection_id=' + collection.id).success(function(data) {
            
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },


      }
    }
  ]);