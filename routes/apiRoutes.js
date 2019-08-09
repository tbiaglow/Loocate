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
        "SELECT id, isClosed, MW, OvCond, Cleanliness, Visitor_Count, ChangingTablesAm, Safety_Condition, UrinalsAm, Insp_Year, Insp_Date, ZipCode ";
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
          res.json(updatedRes);
        }
      );
    });
  });
  // POST route for creating a new example

  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
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
