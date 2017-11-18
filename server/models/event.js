export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    }
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
