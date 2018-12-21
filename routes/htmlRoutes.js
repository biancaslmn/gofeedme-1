const express = require('express');
const router = express.Router();
const path = require('path');

var users = require("../models/users.js");

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
        console.log(result);
        if(result.length > 0) {
            if(httpReq.query.password === result[0].password) {   
                if(result[0].user_type === 'PROVIDER') {
                    return httpRes.status(200).json({ 
                        result: 'redirect', 
                        url: `/provider-dashboard.html?user_id=${result[0].id}` 
                    });
                } else {
                    return httpRes.status(200).json({ 
                        result: 'redirect', 
                        url: `/beneficiary-dashboard.html?user_id=${result[0].id}` 
                    });
                }                                      
            } else {
                httpRes.status(401).json({ 
                    result: 'error', 
                    message: 'Invalid password.' 
                });
            }            
        } else {
            httpRes.status(401).json({
                result: 'error',
                message: 'Username not found.'
            })
        }
    })    
});

module.exports = router;