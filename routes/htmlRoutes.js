const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');

var users = require("../models/users.js");

router.get('/', function(httpReq, httpRes) {

});

router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/login', function(httpReq, httpRes) {
    console.log(httpRes.query);
    httpRes.redirect('/dashboard.html?user_id=123');
});

router.get('/registration', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/registration.html'));
});

router.get('/dashboard', (httpReq, httpRes)=> {
    if(!httpReq.query.user_id || !httpReq.query.password) {
        return httpRes.status(400).json({ error: "You must provide a username and a password for login." });
    }
    
    users.getUser('name', httpReq.query.user_id, function(err, result) {       
        var respData = {};       
        // var resResult = '';
        // var resUrl = '';
        // var resMessage = '';
        // var
        if(result.length > 0) {
            bcrypt.compare(httpReq.query.password, result[0].password, function(err, res) {
                if(res) {
                    // Passwords match
                    if(result[0].user_type === 'PROVIDER') {
                        respData["resResult"] = 'redirect';
                        respData["resUrl"] = `/provider-dashboard.html?user_id=${result[0].id}`;
                    } else if (result[0].user_type === 'ADMIN') {
                        respData["resResult"] = 'redirect';
                        respData["resUrl"] = `/admin.html?user_id=${result[0].id}`;
                    } else {
                        respData["resResult"] = 'redirect';
                        respData["resUrl"] = `/beneficiary-dashboard.html?user_id=${result[0].id}`;
                    }
                    return httpRes.status(200).json({ 
                        result: respData["resResult"], 
                        url: respData["resUrl"],
                        message: respData["resMessage"]            
                    });
                } else {
                    return httpRes.status(401).json({ 
                        result: 'error', 
                        message: 'Invalid Password'            
                    });
                } 
            });
        } else {
            return httpRes.status(401).json({ 
                result: 'error',                 
                message: 'Username Not Found.'            
            });
        }
    })    
});

module.exports = router;