var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Restroom.findAll({}).then(function(dbRestrooms) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbRestrooms
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/restroom/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Restroom.findOne({ where: { id: req.params.id } }).then(function(dbRestroom) {
      res.render("restroom", {
        example: dbRestroom
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
