
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    location: DataTypes.STRING,
    destination: DataTypes.STRING,
    busToArrive: DataTypes.STRING,
    BusArrivalTime: DataTypes.STRING,
  }, {});
  Trip.associate = (models) => {
    // associations can be defined here
    Trip.belongsTo(models.Users, {
      foreignKey: 'Tripid',
    });
  };
  return Trip;
};
