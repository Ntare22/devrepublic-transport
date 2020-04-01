module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Trip, {
      foreignKey: 'tripId',
      as: 'tripsOwner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Users;
};
