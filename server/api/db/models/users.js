module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
