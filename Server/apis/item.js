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

router.post('/remove-all-items', async (req, res) => {
    try{
        console.log(req.body.id)
        let item = await Item.deleteMany({listkey: req.body.listkey})
        console.log(item)
        res.json(item)
        
    }catch(error){console.log(error)}
})

module.exports = router;