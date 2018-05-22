module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATEONLY,
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
      onDelete: 'CASCADE',
      allowNull: false
    },
    centerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId',
      },
      onDelete: 'set null',
      allowNull: true
    },
  }),

  down: queryInterface => queryInterface.dropTable('Events')
};
