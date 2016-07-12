angular.module('starter.services', [])

.service('EventService', function ($q, $http, Backand) {
  var baseUrl = '/1/objects/';
  var objectName = 'test/';

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

  return {
    getEvents: getEvents,
    addEvent: addEvent,
    deleteEvent: deleteEvent
  }
});
