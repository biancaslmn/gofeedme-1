
const express = require('express');
const router = express.Router();



router.post('/provider', function(req, res){
    console.log(req.body);
    res.send("inventory updated")
});

module.exports = router;