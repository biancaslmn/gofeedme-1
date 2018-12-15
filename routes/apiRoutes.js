const express = require('express');
const router = express.Router();

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");

router.post('/api/inventory', function(httpReq, httpRes){
    console.log(httpReq.body);
    res.send("inventory updated");
});

router.post('/api/users', function(httpReq, httpRes) {
    console.log("TEST");
    console.log(httpReq.body);
});

module.exports = router;