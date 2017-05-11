var app = angular.module("medMod");

app.factory("medFactory", function($http){
  var medicine = [];
  var newRx = 0;
  var medNames = [];

  return {
    getMedListInfo: getMedListInfo,
    updateMedList: updateMedList,
    addMedicine: addMedicine,
    deleteMedicine: deleteMedicine,
    updateMedicine: updateMedicine,
    findRx: findRx,
    getNewRx: getNewRx,
    requestMedNames: requestMedNames,
    returnMedNames: returnMedNames
    }

//sending a get request to the server to get the medlist info
  function getMedListInfo(personsid) {
    var promise = $http({
      method: 'GET',
      url:'/meds/' + personsid,
      params: {
        personid: personsid
      }
    }).then(function successfulCallback(response){
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

//sending a post request to the server to add  a new medicine
  function addMedicine(med, personsid) {
    var promise = $http({
      method: 'POST',
      url:'/meds-add',
      data: {
        name: med.name,
        dosage: med.dosage,
        time: med.time,
        rxnumber: med.rxnumber,
        personid: personsid
      }
    }).then(function successfulCallback(response){
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
    return "alert";
  }

//sending a delete request to the server to delete a medicine
  function deleteMedicine(medId, personsid) {
    var promise = $http({
      method: 'DELETE',
      url:'/meds-delete/' + medId + "/" + personsid,
    }).then(function successfulCallback(response){
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

//sending a put request to the server to update the medicine
  function updateMedicine(newMed,medId, personsid) {
    var promise = $http({
      method: 'PUT',
      url:'/meds-update/'+ medId,
      data: {
        name: newMed.name,
        dosage: newMed.dosage,
        time: newMed.time,
        rxnumber: newMed.rxnumber,
        personid: personsid
      }
    }).then(function successfulCallback(response){
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

//sending a get to the server to find the rxnumber and store it in the medfactory
  function findRx(medName){
    var promise = $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + medName
    }).then(function successfulCallback(response) {
      newRx = Number(response.data.idGroup.rxnormId[0]);
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

//take the updated medicine list and pass it to the medListController
  function updateMedList(){
    return medicine;
  }

//take the new rxnumber and pass it to the medListController
  function getNewRx() {
    return newRx;
  }

//sending a get request to the server to get the medicine name
  function requestMedNames() {
    var promise = $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/displaynames.json'
    }).then(function successfullCallback(response) {
      medNames = response.data.displayTermsList.term;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

//take the medname from the factory and pass it to the medListController
  function returnMedNames() {
    return medNames;
  }

});
