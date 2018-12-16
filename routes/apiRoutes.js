const express = require('express');
const router = express.Router();
const multer = require("multer");

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");

router.post('/api/inventory', function(httpReq, httpRes){
    // console.log(httpReq.body);
    // res.send("inventory updated");
    var columns = [
        "name",
        "description",
        "quantity"
    ];
    var values = [
        httpRes.body.name,
        httpRes.body.description,
        httpRes.body.quantity        
    ];
    inventory.insert(columns, values, function(res) {
        httpRes.status(200).json(res);
    });
});

router.post('/api/users/login', function(httpReq, httpRes) {
    if(!httpReq.body.name) {
        httpRes.status(404).json({ error: "You must supply a username." });
    } else {
        
    }
});

router.post('/api/users', function(httpReq, httpRes) {    
    users.insert([
        "name",
        "password",
        "user_type"
    ], [
        httpReq.body.name,
        httpReq.body.password,
        httpReq.body.user_type
    ], function(err,res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
});

router.post('/', function(httpReq, httpRes) {
    if(!httpReq.body.name) {

    }
});

module.exports = router;