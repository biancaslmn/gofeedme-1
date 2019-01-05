var orm = require("../config/orm.js");

var table = "events";

var events = {
  insert: function(columns, values, cb) {
    orm.create(table, columns, values, function(err, res) {
      cb(err, res);
    });  
  },
  update: function(objColVals, conditionObj, cb) {
    orm.update(table, objColVals, conditionObj, function(err, res) {
      cb(err, res);
    });
  },
  getAll: function(userId, cb) {    
    var query = `
    SELECT 
      e.id, 
      e.name, 
      address, 
      user_id, 
      u.name AS user_name, 
      zipcode,
      date
    FROM events e 
    JOIN users u ON e.user_id = u.id
    `;

    if(userId) {
      query += ` AND e.user_id = ${parseInt(userId)}`;      
    }
    console.log(query);
    orm.query(query, function(eventErr, eventsRes) {
      console.log(eventsRes);
      if (eventErr) {
        throw eventErr;
      }
      
      var queryInventory = `
        SELECT 
          i.id, 
          ei.event_id, 
          i.name, 
          i.description, 
          i.quantity, 
          i.user_id, 
          i.restaurant_id,
          r.name AS restaurant_name
        FROM events_inventory ei 
        JOIN inventory i ON ei.inventory_id = i.id
        JOIN restaurants r ON i.restaurant_id = r.id
      `;

      orm.query(queryInventory, function(invErr, invRes) {        
        if (invErr) {
          throw invErr;
        }

        for(var i = 0; i < eventsRes.length; i++) {
          eventsRes[i]["inventory"] = [];
          for(var x = 0; x < invRes.length; x++) {
            if(eventsRes[i].id === invRes[x].event_id) {
              eventsRes[i]["inventory"].push(invRes[x]);
            }
          }
        }
        console.log(eventsRes);
        cb(eventErr, eventsRes);
      });
    });
  },
  getAllAdmin: function(userId, cb) {    
    var query = `
    SELECT 
      e.id, 
      e.name, 
      address, 
      user_id, 
      u.name AS user_name, 
      zipcode,
      date
    FROM events e 
    JOIN users u ON e.user_id = u.id
    `;

    console.log(query);
    orm.query(query, function(eventErr, eventsRes) {
      console.log(eventsRes);
      if (eventErr) {
        throw eventErr;
      }
      
      var queryInventory = `
        SELECT 
          i.id, 
          ei.event_id, 
          i.name, 
          i.description, 
          i.quantity, 
          i.user_id, 
          i.restaurant_id,
          r.name AS restaurant_name
        FROM events_inventory ei 
        JOIN inventory i ON ei.inventory_id = i.id
        JOIN restaurants r ON i.restaurant_id = r.id
      `;

      orm.query(queryInventory, function(invErr, invRes) {        
        if (invErr) {
          throw invErr;
        }

        for(var i = 0; i < eventsRes.length; i++) {
          eventsRes[i]["inventory"] = [];
          for(var x = 0; x < invRes.length; x++) {
            if(eventsRes[i].id === invRes[x].event_id) {
              eventsRes[i]["inventory"].push(invRes[x]);
            }
          }
        }
        console.log(eventsRes);
        cb(eventErr, eventsRes);
      });
    });
  },
  deleteInventory: function(eventId, inventoryId, cb) {
    orm.query("DELETE FROM events_inventory WHERE event_id = ? AND inventory_id = ?", [eventId, inventoryId], function(invErr, invRes) {        
      if (invErr) {
        throw invErr;
      }
      cb(invErr, invRes);
    });
  },
  addInventory: function(params, cb) {
    var col = [];
    var val = [];
    for(var key in params) {
      col.push(key);
      val.push(params[key]);
    }
    orm.create("events_inventory", col, val, function(err, res) {
      if(err) {
        throw err;
      }
      cb(err, res);
    });
  },
  getInventory: function(conditionObj, cb) {
    orm.selectWhere2("events_inventory", conditionObj, function(err, res) {
      cb(err, res);
    })
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = events;
