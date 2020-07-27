const mongoose = require('mongoose')

const Item = new mongoose.Schema({
    text: {type: String, trim: true, default: ''},
    inCart: {type: Boolean, default: false},
    listkey: {type: String, trim: true, default: ''}
},
{
    collection: 'item'
})

module.exports = mongoose.model('Item', Item);