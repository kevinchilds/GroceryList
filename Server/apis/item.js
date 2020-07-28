const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const Item = require('../models/Item')
var ObjectId = require('mongodb').ObjectId;

const dbName = "Portfolio";
var assert = require('assert');

//find all items in grocery list
router.get('/all-items/:id', async (req, res) => {
    console.log(`${req.params.id}`)
    try{
        let response = await Item.find({listkey: req.params.id})
        console.log(response)
        res.json(response)
    }catch(error){console.log(error)}
  
})

//validate items in cart
router.get('/validate-cart/:id', async (req, res) => {
    try{
        const response = await Item.find({ listkey: req.params.id, inCart: true})
        console.log(response);
        res.json(response);
    }catch(error){console.log(error)}
})

//add item to specific grocery list
router.post('/add-item', async (req, res) => {
        try{
            let response = await Item.create({
                text: req.body.text,
                inCart: req.body.inCart,
                listkey: req.body.listkey,
                name: req.body.name
            })
            console.log(response)
            res.json(response)
        }catch(error){ console.error(error)}
})
    
router.post('/remove-grocery-item', async (req, res) => {
    console.log('REQ.BODY', req.body)
    try{
        const response = await Item.remove({ _id: req.body.id})
        console.log(response)
        res.json(response)
    }catch(error){console.log(error)}
})


router.post('/toggle-cart', async (req, res) => {
    try{
        console.log(req.body.id)
        let item = await Item.findOne({_id: req.body.id})
        console.log(item)
        let toggle = item.inCart ? false : true; 
        let data = await Item.updateOne({ _id: req.body.id},
            {
                $set: {
                    inCart: toggle
                }
            }     
        ) 
        
        console.log(data)
        res.json(data)
    }catch(error){console.log(error)}
})



MongoClient.connect('mongodb+srv://GroceryList:DbwflWOmW9Qagh4f@redesignforme-9mmku.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Failed connecting to server: ', err);
    }else{
        const db = client.db(dbName);

        //return all items in a grocery list
        /* router.get('/all-items/:id', (req, res) => {
            console.log(`${req.params.id}`)
            let data = db.collection('item').find({listkey: req.params.id}).toArray()
            .then(results => {
                console.log(results)
                res.json(results);
            })
            .catch(error => console.error(error))    
        })
 */
        //verify there is incart items
        

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
        /* router.post('/toggle-cart/:id', (req, res) => {
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
        }) */

        


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