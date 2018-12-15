const express = require('express');
const router = express.Router();
const path = require('path');

var users = require("../models/users.js");

router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/login', function(httpReq, httpRes) {
    httpRes.redirect('/dashboard.html?user_id=123');
});

router.get('/registration', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/registration.html'));
});

router.get('/dashboard', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/dashboard.html'));
});

module.exports = router;