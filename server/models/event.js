export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId'
      // onDelete: 'CASCADE',
    });
  };

  Event.associate = (models) => {
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId'
      // onDelete: 'CASCADE',
    });
  };

  return Event;
};
