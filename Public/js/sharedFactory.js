var app = angular.module("medMod");

app.factory("sharedFactory", function() {
  var storedPerson = {};
  var storedUser = "";

  return {
    takeObject: takeObject,
    passObject: passObject,
    passUser: passUser,
    takeUser: takeUser
  }

//take the patient  details from lovedonesController and storing it in the sharedFactory
  function takeObject(personObject) {
    storedPerson = personObject;
  }

//take the patient details from the shared factory and pass it to the medListController
  function passObject() {
    return storedPerson;
  }

//take the userid from the loginControllerand stored it in the shared factory
  function takeUser(userid) {
    storedUser = userid;
  }
  
//take the userid from the sharedFactory and pass it to the lovedOnesController
  function passUser() {
    return storedUser;
  }

});
