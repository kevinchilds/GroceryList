const express = require('express');
const path = require('path');

const dbName = "Portfolio";
const colName = "groceryList";
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(express.static(path.join(__dirname,'../Client')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});



MongoClient.connect("mongodb+srv://kchilds2020:Gertie2018@redesignforme-9mmku.azure.mongodb.net", {useUnifiedTopology: true} ,function(err, client) {
  if(err) { return console.dir(err);}
  const db = client.db(dbName);
  console.log(`connected to \'${dbName}\' database and \'${colName}\' collection`);

  /* db.collection(colName, function(err, collection){
        collection.find().pretty();
  }); */
 app.get('/all-items', (req, res) => {
     let data = db.collection('groceryList').find().toArray()
     .then(results => {
         console.log(results)
         res.json(results);
     })
     .catch(error => console.error(error))    
 })

 app.get('/validate-cart', (req, res) => {
    let data = db.collection('groceryList').find({ inCart: true}).toArray()
    .then(results => {
        console.log(results)
        res.json(results);
    })
    .catch(error => console.error(error))    
})


});