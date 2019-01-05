// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string") {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  query: function(query, params, cb) {
    connection.query(query, params, function(err, result) {
      if(err) {
        throw err;
      }
      cb(err, result);
    });
  },
  selectWhere2: function(tableInput, whereObj, cb) {
    var query = "SELECT * FROM ?? WHERE deleted = 0";
    var params = [tableInput];
    var arr = [];

    for (var key in whereObj) {      
      if (Object.hasOwnProperty.call(whereObj, key)) {
        arr.push(" ?? = ? ");        
        params.push(key);        
        params.push(whereObj[key]);        
      }
    }

    if(arr.length > 0) {
      query += " AND";
      query += arr.join("AND");
    }    

    connection.query(query, params, function(err, result) {
      if(err) {
        throw err;
      }
      cb(err, result);
    });
  },
  selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if(err) {
        throw err;
      }
      cb(err, result);
    });
  },
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(err,result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += ` WHERE ${condition.key} = ${condition.val}`;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(err, result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
