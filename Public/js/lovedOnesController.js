var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory, sharedFactory, $location){

//assigns page class to loved ones page
  $scope.pageClass = "loved-page";

//initiate GET request in lovedFactory and stores the response in the lovedOnesController
  dataFactory.getLovedOneInfo(sharedFactory.passUser()).then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
  });

//initiate the POST request in lovedFactory and stores the response in the lovedOnesController
    $scope.userId = sharedFactory.passUser();
    $scope.addLovedOne = function(object) {
      object.userid = sharedFactory.passUser();
      dataFactory.addPerson(object).then(function() {
        $scope.personList = dataFactory.updateLovedOnes();
        $scope.object.name = '';
        $scope.object.weight = '';
        $scope.object.age = '';
      });
  };

//initiate the DELETE request in the lovedFactory and stores the updateLovedOneslist in the controller
  $scope.removeLovedOne = function(personid, userId) {

    dataFactory.removePerson(personid, userId).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

//initiate the PUT request in the lovedFactory and stores the response in the lovedOnesController
  $scope.alterLovedOne = function(newObject, personid, userId){
    dataFactory.alterPerson(newObject, personid, userId).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

//shared factory taking the patient details from the lovedonesController
  $scope.moveAndLoad = function(personObject) {
    sharedFactory.takeObject(personObject);
    $location.path('/content');
  };



});
