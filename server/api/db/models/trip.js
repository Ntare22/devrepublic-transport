
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    location: {
      type: DataTypes.STRING,
      required: true,
    },
    destination: {
      type: DataTypes.STRING,
      required: true,
    },
    user_id: DataTypes.STRING,
    busToArrive: DataTypes.STRING,
    BusArrivalTime: DataTypes.STRING,
    tripId: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {});
  Trip.associate = (models) => {
    // associations can be defined here
    Trip.belongsTo(models.Users, {
      foreignKey: 'user_id',
      // targetKey: 'user_id',
    });
  };
  return Trip;
};
