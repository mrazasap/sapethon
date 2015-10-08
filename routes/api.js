// var express = require('express');
// var router = express.Router();
// var MongoClient = require('mongodb').MongoClient;

// var db;
// var url = 'mongodb://localhost:27017/namaste';
// var logs = '';

// // Use connect method to connect to the Server 
// MongoClient.connect(url, function(err, dbobj) {
//     if (err) {
//       console.log("Can't connect to DB");
//       return;
//     }
//     db = dbobj;
//     logs += "\r\nConnected to DB: "+db.s.databaseName;
//     console.log(logs);
// });

// /* GET home page. */
// router.get('/insert', function(req, res, next) {
//   logs += "\r\nInsert into DB: "+db.s.databaseName;
//   console.log(logs);
  
//   insertDocuments(db, function() {
//     db.users.find();
//     logs += "\r\nSuccessfully Inserted";
//     res.send(logs);
//   });

// });

// var insertDocuments = function(db, callback) {
//   // Get the documents collection 
//   var collection = db.collection('users');
//   logs += "\r\nInsert into collection" + collection.name;
//   // Insert some documents 

//   collection.insert([{name: "Monis Raza1", email: "mraza@sapient.com", phone: "07466666666", last_visited: "03102015:1714", face_api_id: "2323WEE267", face_api_json: ""}], function(err, result) {
//     callback(result);
//   });
// }

// module.exports = router;
var userData = {name: "Monis Raza", email: "mraza@sapient.com", phone: "07466666666", last_visited: "03102015:1714", face_api_id: "2323WEE267", face_api_json: ""};

var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var db;
connect();

/* API routes */
router.get('/users', function(req, res, next) {
  readAll('users', function (result) {
    res.send(result);
  });
});

router.get('/users/create', function(req, res, next) {
  create(userData, 'users', function (result) {
    res.send(result);
  });
});


/* Database query methods */
function connect() {
  db = mongo.db('mongodb://localhost:27017/namaste');
}

function readAll(table, callback) {
  console.log("db.collection(table)", db.collection(table));
  db.collection(table).find().toArray(function(err, result) {
    if (err) throw err;
    callback(result);
  });
}

function create(items, table, callback) {
  db.collection(table).insertMany([items], {w:1}, function(err, result) {
    if (err) throw err;
    readAll('users', callback);
  });
}

module.exports = router;
