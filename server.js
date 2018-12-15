require('slick-carousel');

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

var mysql = require("mysql");
var exphbs = require("express-handlebars");

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(htmlRoutes);
app.use(apiRoutes);

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.listen(PORT, ()=> {
    console.log('listening on port ' + PORT)
})
