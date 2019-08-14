var db = require("../models");
// require async express library to run asynchronous callbacks
var async = require("async");

module.exports = function(app) {
  // Get all bathrooms
  app.get("/api/comfort_stations/", function(req, res) {
    var query = "SELECT Prop_Name, GIS_Site_Location, ZipCode ";
    query +=
      "FROM comfort_stations INNER JOIN all_sites ON (comfort_stations.Prop_ID = all_sites.Prop_ID) ";
    db.connection.query(query, [req.params.id], function(err, response) {
      if (err) {
        throw err;
      }
      res.json(response);
    });
  });

  // get a list of bathrooms, with 3 most recent inspections, by zipcode entered by user
  app.get("/api/comfort_stations/:zip", function(req, res) {
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
              "WHERE (CS_ID = ? ) ORDER BY Insp_Year DESC, Insp_Date DESC LIMIT 6";
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
        res.json(updatedResponse);
      }
    );
  });
  // POST route for creating a new example

  app.post("/api/inspection", function(req, res) {
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.All_Inspections.create({
      Prop_ID: req.propID,
      InspectionID: 5,
      Insp_Date: date.toString(),
      OverallCondition: req.condition,
      Cleanliness: req.cleanliness,
      Comments: req.comments
    }).then(function(dbAll_Inspections) {
      res.json(dbAll_Inspections);
    });
  });

  // Alternative .post format that expands on req.body and makes a route name
  app.post("/api/new", function(req, res) {
    // Create a routeName

    // Using a RegEx Pattern to remove spaces from example.name
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    var routeName = req.body.text.replace(/\s+/g, "").toLowerCase();

    // Then add the example to the database using sequelize
    db.Example.create({
      routeName: routeName,
      text: req.body.text,
      description: req.body.description
    }).then(function(dbExample) {
      res.json(dbExample);
      //res.status(204).end();
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // PUT route for updating examples. We can get the updated todo data from req.body
  app.put("/api/examples", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Example.update(
      {
        text: req.body.text,
        description: req.body.description
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
