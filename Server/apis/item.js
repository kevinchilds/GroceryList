const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const dbName = "Portfolio";
var assert = require('assert');


MongoClient.connect('mongodb+srv://GroceryList:DbwflWOmW9Qagh4f@redesignforme-9mmku.azure.mongodb.net/test?retryWrites=true&w=majority', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Failed connecting to server: ', err);
    }else{
        const db = client.db(dbName);

        //return all items in a grocery list
        router.get('/all-items/:id', (req, res) => {
            let data = db.collection('item').find({listkey: req.params.id}).toArray()
            .then(results => {
                console.log(results)
                res.json(results);
            })
            .catch(error => console.error(error))    
        })

        //verify there is incart items
        router.get('/validate-cart/:id', (req, res) => {
        let data = db.collection('item').find({ listkey: req.params.id, inCart: true}).toArray()
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(error => console.error(error))    
        })

        //return a specific item from a specific list
        router.get('/:item/:id', (req, res) => {
        let data = db.collection('item').find({ listkey: req.params.id, text: req.params.item}).toArray()
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(error => console.error(error))    
        })

        //update inCart value
        router.post('/toggle-cart/:id', (req, res) => {
        let data = db.collection('item').update({ text: req.body.text, listkey: req.params.id},
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

        //add item to specific grocery list
        router.post('/add-item', (req, res) => {
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


        //remove item from specific grocery list
        router.post('/remove-item', (req, res) => {
        let data = db.collection('item').remove({
            text: req.body.text,
            listkey: req.body.listkey
        })
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(error => console.error(error))
        })

        //remove all items with inCart = true from specific grocery list
        router.post('/remove-incart-items/:id', (req, res) => {
        let data = db.collection('item').remove({
            listkey: req.params.id,
            inCart: true
        })
        .then(results => {
            console.log(results)
            res.json(results);
        })
        .catch(error => console.error(error))    
        })

    }

});

module.exports = router;