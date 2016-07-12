angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, EventService) {
  $scope.events = [];
  $scope.input = {};
  $scope.realDate = [];

  function getAllEvents() {
    EventService.getEvents()
    .then(function (result) {
      $scope.events = result.data.data;
      $scope.realDate = result.data.date;
      result.data.data.forEach(function(el){
        el.date = moment(el.date).format("MMM Do YYYY");
        console.log(el.date);
      })
      console.log(typeof(result.data))
      console.log(result.data.data)
    });
  }

  $scope.addEvent = function() {
    EventService.addEvent($scope.input)
    .then(function(result) {
      $scope.input = {};
      // reload all items - suboptimal, but who cares?
      getAllEvents();
    });
  }

  $scope.deleteEvent = function(id) {
    EventService.deleteEvent(id)
    .then(function (result) {
      // reload all items - suboptimal, but who cares?
      getAllEvents();
    });
  }

  getAllEvents();
})

.controller('DetailCtrl', function($scope, $stateParams, EventService) {

  $scope.item = [];
  $scope.ToDate = {};
  $scope.test = {};

  function getObject() {
    EventService.getOne('events', String($stateParams.detailID), false)
    .then(function (result) {
      $scope.item = result.data;
      $scope.ToDate = moment(result.data.date, "YYYYMMDD").fromNow();
      $scope.test = moment(String(result.data.date)).format("MMM Do YYYY");
    })
  }
  getObject();

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

/*.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}) */

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
