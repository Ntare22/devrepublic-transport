
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    location: {
      type: Sequelize.STRING,
    },
    destination: {
      type: Sequelize.STRING,
    },
    BusArrivalTime: {
      type: Sequelize.STRING,
    },
    busToArrive: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Trips'),
};
