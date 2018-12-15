const express = require('express');
const router = express.Router();

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");

router.post('/api/inventory', function(httpReq, httpRes){
    console.log(httpReq.body);
    res.send("inventory updated");
});

router.post('/api/users/login', function(httpReq, httpRes) {
    if(!httpReq.body.name) {
        httpRes.status(404).json({ error: "You must supply a username." });
    } else {
        
    }
});

router.post('/api/users', function(httpReq, httpRes) {    
    var columns = [
        "name",
        "password",
        "user_type"
    ];
    var values = [
        httpReq.body.name,
        httpReq.body.password,
        httpReq.body.user_type
    ];
    users.insert(columns, values, function(res) {
        httpRes.status(200).json(res);
    });
});

router.post('/', function(httpReq, httpRes) {
    if(!httpReq.body.name) {

    }
});

module.exports = router;