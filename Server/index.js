require('dotenv/config');
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
const mongoose =require('mongoose');



app.use(bodyParser.json());

app.use(cors())

//location of frontend
/* app.use(express.static(path.join(__dirname,'../Client'))); */
/* app.use(express.static(path.join(__dirname,'../react-client/public'))); */

mongoose.connect('mongodb+srv://GroceryList:DbwflWOmW9Qagh4f@redesignforme-9mmku.azure.mongodb.net/Portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//location of APIs
app.use('/', require('./apis/groceryList'));
app.use('/', require('./apis/item'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});