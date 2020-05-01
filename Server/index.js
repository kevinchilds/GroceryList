require('dotenv/config');
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');




//location of frontend
app.use(express.static(path.join(__dirname,'../Client')));
app.set('view engine','ejs');
app.get('/', (req, res) => res.render('index'))
app.use(bodyParser.json());


//location of APIs
app.use('/', require('./apis/groceryList'));
app.use('/', require('./apis/item'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});