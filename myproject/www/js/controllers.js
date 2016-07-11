angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('DetailCtrl', function($scope) {

  $scope.meetingDate = moment("20111031", "YYYYMMDD").fromNow(); // 5 years ag

})

.controller('DetailCtrlMerck', function($scope) {
      $scope.firma = "Merck";
      $scope.date = '20160723T00:00:00';
      $scope.location = "Merck Innovation Center Darmstadt";
      $scope.greetingtext = "Noch 23 Tage und 22 Stunden bis zur Verhandlung ihrer Anglage XYZ.";
      $scope.people = [
                          { name: "Hans Müller" },
                          { name: "Peter Mustermann" }
                      ];
})

.controller('DetailCtrlTelekom', function($scope) {
      $scope.firma = "Telekom";
      $scope.date = '20160715T00:00:00';
      $scope.location = "Telekom Center Darmstadt";
      $scope.greetingtext = "Noch 25 Tage und 21 Stunden bis zur Verhandlung ihrer Anglage XYZ.";
      $scope.people = [
                          { name: "Peter Meier" },
                          { name: "Rolf Zukovski" }
                      ];
})

.controller('DetailCtrlLufthansa', function($scope) {

      var meetingDate;

      $scope.firma = "Lufthansa";
      $scope.date = '20160706T00:00:00';
      $scope.timeToMeeting = function(){

        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var month = monthNames[monthIndex];
        var year = date.getFullYear();
        /*$scope.date = [
                      { day: timeToMeeting.day } ,
                      { month: timeToMeeting.monthNames[monthIndex] } ,
                      { year: timeToMeeting.year}
                    ]*/
        console.log(day, monthNames[monthIndex], year);
      };
      $scope.location = "The Squaire Frankfurt";
      $scope.greetingtext = "Noch 25 Tage und 21 Stunden bis zur Verhandlung ihrer Anglage XYZ.";
      $scope.people = [
                          { name: "Air Baloon" },
                          { name: "Dimitri Iganofskaja" }
                      ];
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
