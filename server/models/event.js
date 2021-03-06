export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
      allowNull: false,
    },
    centerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId',
      },
      allowNull: true,
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Event.belongsTo(models.Center, {
      foreignKey: 'centerId'
    });
  };
  return Event;
};
