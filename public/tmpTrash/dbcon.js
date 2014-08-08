var mongode = require('mongode');
var databaseURL = "mongodb://hungryp_mongo:IyalDoL7Jn@localhost:27017/hungryp_mongo";
//var databaseURL = "mongodb://localhost:27017/test";

function getDB() {
  mongode.connect(databaseURL);
  var dbcon = mongode.hungryp_mongo;

  return dbcon;
};

exports.getDB = getDB;

/*
hp.collection('persons');

//hp.persons.find({fname: 'larry'}, function(err, person) {
//  if( err || !person.length ) { 
//    console.log("No find");
//  } else  {
//    console.log( "found" ) ;
//  }
//  }).forEach(function(err,person) {console.log(person);});

var cursor;
cursor = hp.persons.find({'fname':'larry'});
console.log("Cursor size: " + cursor.length);

if (!cursor.length > 0)  {
  console.log("cursor has data");
} else {
  console.log("cursor has no data");
}

cursor.each(function(err, object) {
    if (object) console.log(object);
  });

console.log("Running the app!");
*/