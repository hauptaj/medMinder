var app = angular.module("medMod",["ngRoute", "ngAnimate"]);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login',{
    controller:'loginController',
    templateUrl:'view/login.html'
  })
  .when('/main',{
    controller:'mainController',
    templateUrl:'view/lovedOnes.html'
  })
  .when('/content',{
    controller:'contentController',
    templateUrl:'view/medList.html'
  })
  .when('/register',{
    controller:'registrationController',
    templateUrl: 'view/registration.html'
  })
  .otherwise({ redirectTo: '/login' });

  $locationProvider.hashPrefix('');

});

app.directive("lovedTitle", function() {
  return {
    restrict: "E",
    template: "<h2>{{personsPage.name}}'s Med List</h2>"
  }
});
