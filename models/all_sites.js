module.exports = function(sequelize, DataTypes) {
  var All_Sites = sequelize.define("All_Sites", {
    Prop_ID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Prop_Num: DataTypes.TEXT,
    // Boro: DataTypes.STRING,
    // AMPSDistrict: DataTypes.INTEGER,
    Prop_Name: DataTypes.STRING,
    // Site_Name: DataTypes.STRING,
    // Prop_Location: DataTypes.STRING,
    // Site_Location: DataTypes.STRING,
    // Acres: DataTypes.FLOAT,
    // Category: DataTypes.STRING,
    // Sub_Category: DataTypes.STRING,
    // Rated: DataTypes.INTEGER,
    // Reason_Not_Rated: DataTypes.STRING,
    // Council_District: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    // COMMUNITYBOARD: DataTypes.STRING,
    // Jurisdiction: DataTypes.STRING,
    // NYSAssembly: DataTypes.STRING,
    // NYSSenate: DataTypes.STRING,
    // USCongress: DataTypes.STRING,
    // Precinct: DataTypes.STRING,
    // ComfortStation: DataTypes.STRING,
    // PermitDistrict: DataTypes.STRING,
    // GISBoro: DataTypes.STRING,
    // GIS_Site_Location: DataTypes.STRING
    }, {
    timestamps: false
  });

  return All_Sites;
};
