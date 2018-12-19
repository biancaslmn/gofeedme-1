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
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = events;
