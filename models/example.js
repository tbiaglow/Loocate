//This file exports a function that takes in sequelize and allows us to create data types in SQL
//We could use Example.create to add an example with properties "text" and "description"
//See: https://sequelize.readthedocs.io/en/2.0/docs/models-definition/, scroll down to "defining as part of a property"
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
