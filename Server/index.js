require('dotenv/config');
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

//location of frontend
//app.use(express.static(path.join(__dirname,'../Client')));

/* if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('../Client'));
} */
app.use(express.static('../Client'));
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '../Client', 'index.html'));
});


//location of APIs
app.use('/', require('./apis/groceryList'));
app.use('/', require('./apis/item'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});