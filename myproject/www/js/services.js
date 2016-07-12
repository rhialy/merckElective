angular.module('starter.services', [])

.service('EventService', function ($q, $http, Backand) {
  var baseUrl = '/1/objects/';
  var objectName = 'events/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  getEvents = function () {
    return $http.get(getUrl());
  };

  addEvent = function(todo) {
    return $http.post(getUrl(), todo);
  }

  deleteEvent = function (id) {
    return $http.delete(getUrlForId(id));
  };

  getOne = function (name, id, deep, level) {
    return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
        params: {
          deep: deep,
          level: level
        }
    });
  };

  return {
    getEvents: getEvents,
    addEvent: addEvent,
    deleteEvent: deleteEvent,
    getOne: getOne
  }
});
