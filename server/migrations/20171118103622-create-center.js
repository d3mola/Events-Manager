module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
  }),

  down: queryInterface => queryInterface.dropTable('Centers')
};
