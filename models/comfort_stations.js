module.exports = function(sequelize, DataTypes) {
  var Comfort_Stations = sequelize.define("Comfort_Stations", {
    Prop_ID: DataTypes.STRING,
    CS_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // Winterized: DataTypes.STRING,
    // Reason_Winterized: DataTypes.TEXT,
    Long_Term_Closure: DataTypes.STRING,
    // Reason_Closed: DataTypes.TEXT,
    // Other_Notes: DataTypes.TEXT
    }, {
      timestamps: false
  });

    return Comfort_Stations;
  };
