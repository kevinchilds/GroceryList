const mongoose = require('mongoose')

const groceryList = new mongoose.Schema({
    listkey: {type: String, trim: true, default: ''},
},
{
    collection: 'groceryList'
})

module.exports = mongoose.model('groceryList', groceryList);