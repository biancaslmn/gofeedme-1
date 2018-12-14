
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
var mysql = require("mysql");

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');


const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


 app.use(htmlRoutes);
 app.use(apiRoutes);


app.listen(PORT, ()=> {
    console.log('listening on port ' + PORT)
})