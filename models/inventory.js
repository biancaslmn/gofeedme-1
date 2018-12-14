var orm = require("../config/orm.js");

var inventory = {
  all: function(cb) {
    orm.all("inventory", function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = inventory;
