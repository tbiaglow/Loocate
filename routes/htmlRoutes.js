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

  // Return complete comfort station objects by zipcode
  app.get("/comfort_stations/:zip", function(req, res) {
    async.waterfall(
      [
        function(callback) {
          var query =
            "SELECT Prop_Name, all_sites.Prop_ID, CS_ID, ZipCode, GIS_Site_Location ";
          query +=
            "FROM comfort_stations INNER JOIN all_sites ON (comfort_stations.Prop_ID = all_sites.Prop_ID) ";
          // query +=
          //   "LEFT JOIN all_inspections ON (all_sites.Prop_ID = all_inspections.Prop_ID) ";
          // query +=
          //   "LEFT JOIN comfort_inspections ON (all_inspections.InspectionID = comfort_inspections.InspectionID) ";
          query += "WHERE (ZipCode = ? )";
          db.connection.query(query, [req.params.zip], function(err, response) {
            // response will be comfort station objects, containining location and ID
            callback(null, response);
          });
        },
        // pass the response into the next function to run each comfort station ID against database, returning facility information
        function(response, mainCallback) {
          var newResponse = [];
          // console.log(response);
          async.forEachOf(response, function(responseElement, i, callback) {
            var query =
                "SELECT MAX(UrinalsAM) as urinalsMax, MAX(ToiletsAM) as toiletsMax, MAX(ChangingTablesAM) as changingTablesMax FROM comfort_inspections INNER JOIN all_inspections ON (comfort_inspections.InspectionID = all_inspections.InspectionID) WHERE (Prop_ID = ? )";
            db.connection.query(query, responseElement.Prop_ID, function(
              err,
              res
            ) {
              responseElement.facilities = res;
              newResponse.push(responseElement);
              callback();
            });
          },
          function(err) {
            if (err) {
              throw err;
            }
            mainCallback(null, newResponse);
          }
          );
        },
        function(newResponse, mainCallback) {
          console.log(newResponse);
          var updatedResponse = [];
          async.forEachOf(newResponse, function(responseElement, i, callback) {
            // MySQL query
            // query URLs
            var query =
              "SELECT id, all_inspections.Prop_ID, isClosed, MW, OvCond, Cleanliness, Visitor_Count, ChangingTablesAm, Safety_Condition, UrinalsAm, Insp_Year, Insp_Date, ZipCode ";
            query +=
                "FROM comfort_stations INNER JOIN all_sites ON (comfort_stations.Prop_ID = all_sites.Prop_ID) ";
            query +=
              "LEFT JOIN all_inspections ON (all_sites.Prop_ID = all_inspections.Prop_ID) ";
            query +=
              "LEFT JOIN comfort_inspections ON (all_inspections.InspectionID = comfort_inspections.InspectionID) ";
            query +=
              "WHERE (CS_ID = ? ) ORDER BY Insp_Year DESC, Insp_Date ASC LIMIT 6";
            db.connection.query(query, responseElement.CS_ID, function(
              err,
              res
            ) {
              responseElement.inspections = res;
              updatedResponse.push(responseElement);
              callback();
            });
          }, function(err) {
            if (err) throw err;
            mainCallback(null, updatedResponse);
          }
          );
        }
      ],
      function(err, updatedResponse) {
        res.render("comfort", {
          comfortStation: updatedResponse
        });
      }
    );
  });

  // load form for user to post their own inspection
  app.get("/inspection/:id", function(req, res) {
    var id = req.params.id;
    res.render("input", {
      id: id
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
