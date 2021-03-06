"use strict";

// require("dotenv").config();

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.js")[env];
var db = {};

// const key = process.env.API_KEY;

// require mysql
var mysql = require("mysql");




// mysql connection
if (process.env.JAWSDB_NAVY_URL) {
  db.connection = mysql.createConnection(process.env.JAWSDB_NAVY_URL)
} else {
  db.connection = mysql.createConnection({
    user: config.username,
    password: config.password,
    database: config.database,
    port: config.port,
    dialect: config.dialect
  });
};

if (process.env.JAWSDB_NAVY_URL) {
  var sequelize = new Sequelize(process.env.JAWSDB_NAVY_URL);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;