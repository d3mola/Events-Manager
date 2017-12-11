export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

  // class methods
  Center.associate = ((models) => {
    Center.hasMany(models.Event, {
      as: 'events',
      foreignKey: 'centerId'
    });
  });

  Center.associate = (models) => {
    Center.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Center;
};
