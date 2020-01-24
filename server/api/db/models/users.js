module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    bus_no: DataTypes.STRING,
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
