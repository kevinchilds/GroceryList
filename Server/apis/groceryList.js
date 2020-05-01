const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const dbName = "Portfolio";
var assert = require('assert');


MongoClient.connect('mongodb+srv://GroceryList:DbwflWOmW9Qagh4f@redesignforme-9mmku.azure.mongodb.net', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Unable to connect to mongo server: ', err);
    }
    else{
        console.log('MONGO DB HAS SUCCESSFULLY CONNECTED');
        const db = client.db(dbName);
    
        //return groceryList document if ID exists
        router.get('/grocery-list/:id', (req, res) => {
            let data = db.collection('groceryList').find({ listkey: req.params.id}).toArray()
            .then(results => {
                console.log(results);
                res.json(results);
            })
            .catch(error => console.error(error))    
        })

        //adds a new groceryList document
        router.post('/add-list', (req, res) => {
            let data = db.collection('groceryList').insert({
                listkey: req.body.listkey
            })
            .then(results => {
                console.log(results);
                res.json(results);
            })
            .catch(error => console.error(error))
        })
    }
});



module.exports = router;


