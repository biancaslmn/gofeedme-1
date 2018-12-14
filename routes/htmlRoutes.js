const express = require('express');
const router = express.Router();
const path = require('path');




router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/login', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

router.get('/registration', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/registration.html'));
});

router.get('/dashboard', (req, res)=> {
    res.sendFile(path.join(__dirname + '/../public/dashboard.html'));
});



module.exports = router;