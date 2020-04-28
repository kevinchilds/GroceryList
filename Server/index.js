const express = require('express');
const path = require('path');

const dbName = "Portfolio";
const colName = "item";
var assert = require('assert');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../Client')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});



MongoClient.connect("mongodb+srv://kchilds2020:Gertie2018@redesignforme-9mmku.azure.mongodb.net", {useUnifiedTopology: true} ,function(err, client) {
  if(err) { return console.dir(err);}
  const db = client.db(dbName);
  console.log(`connected to \'${dbName}\' database and \'${colName}\' collection`);

 app.get('/all-items/:id', (req, res) => {
     let data = db.collection('item').find({listkey: req.params.id}).toArray()
     .then(results => {
         console.log(results)
         res.json(results);
     })
     .catch(error => console.error(error))    
 })

 app.get('/validate-cart', (req, res) => {
    let data = db.collection('item').find({ inCart: true}).toArray()
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))    
})

app.get('/grocery-list/:id', (req, res) => {
    console.log(req.params.id);
    let data = db.collection('groceryList').find({ listkey: req.params.id}).toArray()
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))    
})

app.get('/:id', (req, res) => {
    let data = db.collection('item').find({ text: req.params.id}).toArray()
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))    
})

app.post('/toggle-cart', (req, res) => {
    let data = db.collection('item').update({ text: req.body.text},
        {
            $set: {
                inCart: req.body.inCart
            }
        }     
    ) 
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))
})

app.post('/add-item', (req, res) => {
    let data = db.collection('item').insert({
        text: req.body.text,
        inCart: req.body.inCart,
        listkey: req.body.listkey
    })
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))
})

app.post('/add-list', (req, res) => {
    let data = db.collection('groceryList').insert({
        listkey: req.body.listkey
    })
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))
})

app.post('/remove-item', (req, res) => {
    let data = db.collection('item').remove({
        text: req.body.text,
    })
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => console.error(error))
})

app.post('/remove-incart-items', (req, res) => {
    let data = db.collection('item').remove({
        inCart: true
    })
    .then(results => {
        console.log(results)
        res.json(results);
    })
    .catch(error => console.error(error))    
})




});