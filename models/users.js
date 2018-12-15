var orm = require("../config/orm.js");

var users = {
  insert: function(columns, values, cb) {
    orm.create("users", columns, values, function(res) {
      cb(res);
    });
  },
  getUser: function(col, val, cb) {
    orm.selectWhere("users", col, val, function(err, res) {
      cb(err, res);
    }) 
  } 

};

// Export the database functions for the controller (catsController.js).
module.exports = users;
