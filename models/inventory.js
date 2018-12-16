var orm = require("../config/orm.js");
var table = "inventory";

var inventory = {
  insert: function(columns, values, cb) {
    orm.create(table, columns, values, function(res) {
      cb(res);
    });

  }
};

// Export the database functions for the controller (catsController.js).
module.exports = inventory;
