var db = require("../models");
var async = require("async");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Comfort Stations
  app.get("/comfort_stations/:zip", function(req, res) {
    var query = "SELECT Prop_Name, CS_ID, ZipCode, GIS_Site_Location ";
    query +=
      "FROM comfort_stations INNER JOIN all_sites ON (comfort_stations.Prop_ID = all_sites.Prop_ID) ";
    query += "WHERE (ZipCode = ? )";
    db.connection.query(query, [req.params.zip], function(err, response) {
      if (err) {
        throw err;
      }
      // loop through responses, query database to get inspections for each comfort station in the response
      updatedRes = [];
      // query URL
      var query =
        "SELECT id, isClosed, MW, OvCond, Cleanliness, Visitor_Count, ChangingTablesAm, Safety_Condition, ToiletsAm, UrinalsAm, Insp_Year, Insp_Date, ZipCode ";
      query +=
        "FROM comfort_inspections RIGHT JOIN all_inspections ON (comfort_inspections.InspectionID = all_inspections.InspectionID) ";
      query +=
        "RIGHT JOIN all_sites ON (all_inspections.Prop_ID = all_sites.Prop_ID) ";
      query +=
        "RIGHT JOIN comfort_stations ON (all_sites.Prop_ID = comfort_stations.Prop_ID) ";
      query +=
        "WHERE (CS_ID = ? ) ORDER BY Insp_Year DESC, Insp_Date DESC LIMIT 6";
      async.forEachOf(
        response,
        function(responseElement, i, innerCallback) {
          // MySQL query
          db.connection.query(query, responseElement.CS_ID, function(err, res) {
            if (err) {
              throw err;
            }
            responseElement.inspections = res;
            updatedRes.push(responseElement);
            innerCallback(null);
          });
        },
        function(err) {
          if (err) {
            throw err;
          }
          res.render("comfort", {
            comfortStation: updatedRes
          });
        }
      );
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
