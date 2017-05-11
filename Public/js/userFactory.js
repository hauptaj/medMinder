var app = angular.module("medMod");

app.factory("userFactory", function($http) {
  var users = [];

  return {
    addUser: addUser,
    updateUser: updateUser,
    getUserInfo: getUserInfo
  }

function updateUser() {
  return users;
}

//sending a post request to the server to add a new user
function addUser(object) {
  var promise = $http({
    method: 'POST',
    url: '/users-add',
    data: {
      firstname: object.firstname,
      lastname: object.lastname,
      email: object.email,
      password: object.password,
      username: object.username
    }
  }).then(function successfullCallback(response) {
    users = response.data;
  }, function(error) {
    console.log(error);
  });
    return promise;
}

//sending a get request to the server to get the userid
function getUserInfo(user){
  var promise = $http({
    method: 'GET',
    url: '/login/'+ user.username + '/' + user.password,
    params: {
      username: user.username,
      password: user.password
    }

 }).then(function successCallback(response) {
      users = response.data[0].userid;
  }, function(error) {
      console.log(error);
  });
  return promise;
}

});
