var orm = require("../config/orm.js");
var table = "inventory";

var inventory = {
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
  getAll: function(conditionObj, cb) {
    orm.selectWhere2(table, conditionObj, function(err, res) {
      cb(err, res);
    })
  },
  getAvailable: function(cb) {
    var query = `
    SELECT * 
    FROM inventory 
    WHERE deleted = 0 
    AND id NOT IN(
              SELECT inventory_id 
              FROM events_inventory
            );
    `;
    orm.query(query, function(eventErr, eventsRes) {
      if (eventErr) {
        throw eventErr;
      }
      cb(eventErr, eventsRes);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = inventory;
