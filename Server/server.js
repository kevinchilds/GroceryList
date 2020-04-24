// Retrieve
const dbName = "Portfolio";
const colName = "grocery-list";
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb+srv://kchilds2020:Gertie2018@redesignforme-9mmku.azure.mongodb.net", {useUnifiedTopology: true} ,function(err, client) {
  if(err) { return console.dir(err);}
  
  const db = client.db(dbName);

  db.collection(colName, {w:1}, function(err, collection){
        collection.insertOne(
            { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
            );
  });
  console.log(`connected to \'${dbName}\' database and \'${colName}\' collection`);

});


