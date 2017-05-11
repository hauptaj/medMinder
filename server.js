var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');


var pool = require('./pg-connection-pool');

app.use(bodyParser.json({extend: true}));
app.use(express.static(__dirname + '/Public'));

//This function is how the server handles a GET request from the login view
app.get('/login/:username/:password', function(req, res, next){
  var user = [];
  var username = req.params.username;
  var password = req.params.password;
  console.log(username);
  console.log(password);

  //This function is querying the data from the usertable and pushing to the "user" variable
 pool.connect(function(err, client, done){
    var query = client.query('SELECT userid FROM usertable WHERE username=($1) AND password=($2)',[username, password]);

   query.on('row', function(row){
      user.push(row);
    });
    query.on('end', function(){
      console.log(user);
      done();
      return res.json(user);
    });
  });
});

//This function is how the server handles a GET request from the lovedones view
app.get('/lovedones/:userid', function(req, res, next) {
  var list = [];
  var userid = req.params.userid;


//This function is querying the data from the lovedones database the pushing to the "list" variable
  pool.connect(function(err, client, done) {

   var query = client.query('SELECT * FROM lovedones WHERE userid=($1)', [userid]);

   query.on('row', function(row) {
      list.push(row);
    });

   query.on('end', function() {

      done();
      return res.json(list);
    });
  });
});


//This function is how the server deals with a post request for new loved ones
app.post('/lovedones-add', function(req, res, next) {
  var list = [];
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age,
    userid: req.body.userid
  };

//connect with database
  pool.connect(function(err, client, done) {
//insert into the table
    client.query('INSERT INTO lovedones(name, weight, age, userid) values($1, $2, $3, $4)', [data.name, data.weight, data.age, data.userid]);

    var query = client.query('SELECT * FROM lovedones WHERE userid=($1)', [data.userid]);

    query.on('row', function(row) {
      list.push(row);
    });

    query.on('end', function() {
      console.log(list);
      done();
      return res.json(list);
    });
  });
});

//This function is how the server deals with a delete request for a loved one
app.delete('/lovedones-delete/:id/:userId', function(req, res, next) {
    var list = [];
    var id = req.params.id;
    var userId = req.params.userId;

//connect with database
    pool.connect(function(err, client, done) {
      //DELETE from the table at specific Id
      client.query('DELETE FROM medicine WHERE personid=($1)',[id]);
      client.query('DELETE FROM lovedones WHERE personid=($1)', [id]);

      var query = client.query('SELECT * FROM lovedones WHERE userid=($1)', [userId]);

      query.on('row', function(row) {
        list.push(row);
      });

      query.on('end', function() {
        console.log(list);
        done();
        return res.json(list);
      });
    });
});

//This function is how the server deals with a put request for the lovedones
app.put('/lovedones-edit/:id/:userId', function(req, res, next) {
  var list = [];
  var id = req.params.id;
  var userId = req.params.userId;
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age
  };

  pool.connect(function(err, client, done) {
//update from the table at specific Id
    client.query('UPDATE lovedones SET name=($1), weight=($2), age=($3) WHERE personid=($4)', [data.name, data.weight, data.age, id]);

    var query = client.query('SELECT * FROM lovedones WHERE userid=($1)', [userId]);

    query.on('row', function(row) {
      list.push(row);
    });

    query.on('end', function() {
      console.log(list);
      done();
      return res.json(list);
    });
  });
});

//This function is how the server deals with a GET request for getting medicinelist
app.get('/meds/:personid', function(req, res, next) {
  var medList = [];
  var personid = req.query.personid;


  pool.connect(function(err, client, done) {
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [personid]);

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      console.log(medList);
      done();
      return res.json(medList);
    });
  });
});

//This function is how the server deals with a POST request for adding new medicine to the lovedones medList
app.post('/meds-add', function(req, res, next) {
  var medList = [];
  data = {
    name: req.body.name,
    dosage: req.body.dosage,
    time: req.body.time,
    rxnumber: req.body.rxnumber,
    personid: req.body.personid
  }

  pool.connect(function(err, client, done) {
    client.query('INSERT INTO medicine(name, dosage, time, rxnumber, personid) values($1, $2, $3, $4, $5)', [data.name, data.dosage, data.time, data.rxnumber, data.personid]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [data.personid]);

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(medList);
    });
  });
});

//This function is how the server deals with a DELETE request for deleting medicin
app.delete('/meds-delete/:id/:personid', function(req, res, next) {
  var medList = [];
  var id = req.params.id;
  var personid = req.params.personid;

  pool.connect(function(err, client, done) {
    client.query('DELETE FROM medicine WHERE id=($1)', [id]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [personid]);

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(medList);
    });
  });
});

//This function is how the server deals with a PUT request for updating medlist
app.put('/meds-update/:id', function(req, res, next) {
  var medList = [];
  var id = req.params.id;
  var data = {
    name: req.body.name,
    dosage: req.body.dosage,
    time: req.body.time,
    rxnumber: req.body.rxnumber,
    personid: req.body.personid
  };

  pool.connect(function(err, client, done) {
    client.query('UPDATE medicine SET name=($1), dosage=($2), time=($3), rxnumber=($4) WHERE id=($5)', [data.name, data.dosage, data.time, data.rxnumber, id]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [data.personid]);

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      console.log(medList);
      done();
      return res.json(medList);
    });
  });
});

//This function is how the server deals with a PUT request for adding rxnumber to medicine table
app.put('/rx-add', function(req, res, next) {
  var medList = [];

  var data = {
    name: req.body.name,
    rxnumber: req.body.rxnumber
  };

  pool.connect(function(err, client, done) {
    client.query('UPDATE medicine SET rxnumber=($1) WHERE name=($2)', [data.rxnumber, data.name]);
    var query = client.query('SELECT * FROM medicine');

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      console.log(medList);
      done();
      return res.json(medList);
    });
  });
});

//This function is how the server deals with a POST request for adding new user
app.post('/users-add', function(req, res, next) {
  var list = [];
  var data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  };

  pool.connect(function(err, client, done) {
  var query = client.query('INSERT INTO usertable(firstname, lastname, email, password, username) values($1, $2, $3, $4, $5)', [data.firstname, data.lastname, data.email, data.password, data.username]);

    query.on('row', function(row){
      list.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(list);
    });
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  var port = server.address().port;
  console.log('postgreSQL server running at http://localhost:%s', port);
});
