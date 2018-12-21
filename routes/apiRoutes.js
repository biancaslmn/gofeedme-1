const express = require('express');
const router = express.Router();

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");
var events = require("../models/events.js");
var restaurants = require("../models/restaurants.js");

var authErrorMessage = "You must supply a 'user_id'";

router.get('/api/restaurants', function(httpReq, httpRes) {
    if(!httpReq.query.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }

    var whereObj = {};
    whereObj["user_id"] = httpReq.query.user_id;
    
    restaurants.getAll(whereObj, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.post('/api/restaurants', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }

    var columns = [
        "name",
        "address",
        "zipcode",
        "kitchen",
        "user_id"
    ];

    var values = [
        httpReq.body.name,
        httpReq.body.address,
        httpReq.body.zipcode,
        httpReq.body.kitchen,
        httpReq.body.user_id     
    ];

    restaurants.insert(columns, values, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
});

router.get('/api/inventory', function(httpReq, httpRes) {    
    if(!httpReq.query.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }

    var whereObj = {};
    whereObj["user_id"] = httpReq.query.user_id;
    
    if(httpReq.query.restaurant_id) {
        whereObj["restaurant_id"] = httpReq.query.restaurant_id;
    }

    inventory.getAll(whereObj, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.post('/api/events', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }
    var columns = [
        "name",
        "address",
        "user_id",
        "zipcode"
    ];

    var values = [
        httpReq.body.name,
        httpReq.body.address,
        httpReq.body.user_id,
        httpReq.body.zipcode
             
    ];

    events.insert(columns, values, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
});

router.delete('/api/events', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to delete an event."
        });
    }
    
    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update your event."
        });
    }

    events.update({
        deleted: 1
    }, {
        key: "id",
        val: httpReq.body.id
    }, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});



router.put('/api/events', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to update inventory."
        });
    }

    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update inventory."
        });
    }

    var updateObj = {
        name: httpReq.body.name,
        address: httpReq.body.address,
        zipcode: httpReq.body.zipcode,
        deleted: httpReq.body.deleted   
    }
    
    var where = {
        key: "id",
        val: httpReq.body.id
    };

    events.update(updateObj, where, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.delete('/api/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to update inventory."
        });
    }
    
    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update inventory."
        });
    }

    inventory.update({
        deleted: 1
    }, {
        key: "id",
        val: httpReq.body.id
    }, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.put('/api/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to update inventory."
        });
    }

    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update inventory."
        });
    }

    var updateObj = {
        name: httpReq.body.name,
        description: httpReq.body.description,
        quantity: httpReq.body.quantity,
        deleted: httpReq.body.deleted
    }
    
    var where = {
        key: "id",
        val: httpReq.body.id
    };

    inventory.update(updateObj, where, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.post('/api/inventory', function(httpReq, httpRes){
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to post inventory."
        });
    }

    var columns = [
        "name",
        "description",
        "quantity",
        "user_id",
        "restaurant_id"
    ];

    var values = [
        httpReq.body.name,
        httpReq.body.description,
        httpReq.body.quantity,
        httpReq.body.user_id,
        httpReq.body.restaurant_id
    ];

    inventory.insert(columns, values, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
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