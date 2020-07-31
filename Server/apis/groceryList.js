const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const groceryList = require('../models/groceryList')

const dbName = "Portfolio";
var assert = require('assert');


router.post('/add-list', async (req, res) => {
    try{
        const response = await groceryList.create({
            listkey: `${req.body.listkey}`
        })
        console.log('ADDLIST RESPONSE',response);
        res.json(response);

    }catch(error){console.log(error)}
})


module.exports = router;


