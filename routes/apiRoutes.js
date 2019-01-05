const express = require('express');
const router = express.Router();

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");
var events = require("../models/events.js");
var restaurants = require("../models/restaurants.js");
const bcrypt = require("bcrypt");

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

router.get('/api/inventory/available', function(httpReq, httpRes) {
    if(!httpReq.query.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }

    inventory.getAvailable(function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
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

router.get('/api/events/admin', function(httpReq, httpRes) {        
    events.getAllAdmin(httpReq.query.user_id, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.get('/api/events', function(httpReq, httpRes) {        
    events.getAll(httpReq.query.user_id, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.delete('/api/events/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }
    
    if(!httpReq.body.event_id || !httpReq.body.inventory_id) {
        return httpRes.status(500).json({ 
            result: "error",
            message: "You must provide an eventID and an inventoryID."
        });
    }

    events.deleteInventory(httpReq.body.event_id, httpReq.body.inventory_id, function(err, res) {
            httpRes.status(200).json(res);    
        }
    );
});

router.post('/api/events/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: authErrorMessage
        });
    }

    events.addInventory({
        event_id: httpReq.body.event_id,
        inventory_id: httpReq.body.inventory_id
    }, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
})

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
        "zipcode",
        "date"
    ];

    var values = [
        httpReq.body.name,
        httpReq.body.address,
        httpReq.body.user_id,
        httpReq.body.zipcode,
        httpReq.body.date
             
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
    bcrypt.hash(httpReq.body.password, 10, function(bcryptErr, bcryptHash) {        
        if(bcryptErr) {
            return httpRes.status(500).json({ error: bcryptErr });
        } else {
            users.insert([
                "name",
                "password",
                "user_type"
            ], [
                httpReq.body.name,
                bcryptHash,
                httpReq.body.user_type
            ], function(err,res) {
                if(err) {
                    return httpRes.status(500).json({ error: err });
                }
                httpRes.status(200).json(res);
            });    
        }
    });
});

router.post('/', function(httpReq, httpRes) {
    if(!httpReq.body.name) {

    }
});

module.exports = router;