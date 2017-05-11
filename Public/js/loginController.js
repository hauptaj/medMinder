var app = angular.module("medMod");

app.controller("loginController", function($scope, userFactory, sharedFactory, $location){

  $scope.pageClass = "login-page";

//get the user id from the userFactory then store it in the login controller and shared factory take it from the login conroller
  $scope.moveAndUse = function(user) {
    userFactory.getUserInfo(user).then(function(){
      $scope.userid = userFactory.updateUser();

      sharedFactory.takeUser($scope.userid);
      $location.path('/main');
    });
 };
 var vid = document.getElementById("my-video");
 vid.playbackRate = 0.7;
});
