module.exports = function(sequelize, DataTypes) {
  var All_Inspections = sequelize.define("All_Inspections", {
    Prop_ID: DataTypes.STRING,
    // AMPSDistrict: DataTypes.INTEGER,
    InspectionID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // Season: DataTypes.STRING,
    // Insp_Round: DataTypes.INTEGER,
    Insp_Date: DataTypes.DATE,
    // BeginInspection: DataTypes.STRING,
    // EndInspection: DataTypes.STRING,
    // Insp_Year: DataTypes.INTEGER,
    // Inspector: DataTypes.INTEGER,
    // Inspector2: DataTypes.INTEGER,
    OverallCondition: DataTypes.STRING,
    Cleanliness: DataTypes.STRING,
    Safety_Condition: DataTypes.STRING,
    // Structural_Condition: DataTypes.STRING,
    Visitor_Count: DataTypes.INTEGER,
    Closed: DataTypes.STRING,
    Comments: DataTypes.TEXT,
    // Inspection_Type: DataTypes.STRING,
    // InspAddedDate: DataTypes.DATE
  }, {
    timestamps: false
});

  // All_Inspections.associate = function(db) {
  //   All_Inspections.belongsTo(db.Comfort_Stations, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return All_Inspections;
};
