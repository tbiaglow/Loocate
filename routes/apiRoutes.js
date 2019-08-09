// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all restrooms, return as json
  app.get("/api/restrooms", function(req, res) {
    //findAll returns all entries for a table when used with no options
    //See: https://sequelize.org/master/manual/querying.html
    db.Restroom.findAll({}).then(function(dbRestrooms) {
      // We have access to the examples as an argument inside of the callback function
      res.json(dbRestrooms);
    });
  });

  // POST route for creating a new example
  app.post("/api/restrooms", function(req, res) {
    db.Restroom.create(req.body).then(function(dbRestroom) {
      res.json(dbRestroom);
    });
  });

  // Alternative .post format that expands on req.body and makes a route name
  app.post("/api/new", function(req, res) {


    // Create a routeName

    // Using a RegEx Pattern to remove spaces from example.name
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    var routeName = req.body.text.replace(/\s+/g, "").toLowerCase();

    // Then add the example to the database using sequelize
    db.Restroom.create({
      routeName: routeName,
      text: req.body.text,
      description: req.body.description
    }).then(function(dbRestroom) {
      res.json(dbRestroom);
      //res.status(204).end();
  });


  // Delete an example by id
  app.delete("/api/restrooms/:id", function(req, res) {
    db.Restroom.destroy({ where: { id: req.params.id } }).then(function(dbRestroom) {
      res.json(dbRestroom);
    });
  });


// PUT route for updating examples. We can get the updated todo data from req.body
app.put("/api/restrooms", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.Restroom.update({
    text: req.body.text,
    description: req.body.description
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(dbRestroom) {
    res.json(dbRestroom);
  });
});

};