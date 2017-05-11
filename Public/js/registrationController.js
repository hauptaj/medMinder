var app = angular.module("medMod");

app.controller("registrationController", function($scope, userFactory, $location) {

//assigns page class to registration page
  $scope.pageClass = "registration-page";
  
//initiate a POST request to userFactory and store the response in the registrationController
  $scope.addUser= function(object){
    userFactory.addUser(object).then(function() {

      $scope.userlist = userFactory.updateUser();
    });

    $location.path('/login');
  };

});
