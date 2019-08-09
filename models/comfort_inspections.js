module.exports = function(sequelize, DataTypes) {
  var Comfort_Inspections = sequelize.define("Comfort_Inspections", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    InspectionID: DataTypes.INTEGER,
    // CSNumber: DataTypes.INTEGER,
    // MW: DataTypes.STRING,
    // OvCond: DataTypes.STRING,
    IsClosed: DataTypes.INTEGER,
    // IsOfficially: DataTypes.INTEGER,
    // HandDryersAm: DataTypes.INTEGER,
    // ChangingTablesAm: DataTypes.INTEGER,
    // MirrorsAm: DataTypes.INTEGER,
    UrinalsAm: DataTypes.INTEGER,
    // UrinalsComm: DataTypes.TEXT,
    ToiletsAm: DataTypes.INTEGER,
    // ToiletsComm: DataTypes.TEXT,
    SinksAm: DataTypes.INTEGER,
    // SinksComm: DataTypes.TEXT,
    // ToiletPaperDispAm: DataTypes.INTEGER,
    // ToiletPaperDispComm: DataTypes.TEXT,
    // SoapDispAm: DataTypes.INTEGER,
    // SoapDispComm: DataTypes.TEXT,
    // PaperTowelDispAm: DataTypes.INTEGER,
    // PaperTowelDispComm: DataTypes.TEXT,
    Comm: DataTypes.TEXT
    }, {
    timestamps: false
  });
  // Comfort_Inspections.associate = function(models) {
  //   Comfort_Inspections.belongsTo(models.Comfort_Stations, {
  //     targetKey: "dfdf",
  //     constraints: false
  //   });
  // };
  return Comfort_Inspections;
};
