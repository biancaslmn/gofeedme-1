var orm = require("../config/orm.js");

var users = {
  insert: function(cb) {
    orm.create("users", function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = users;
