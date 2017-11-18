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
    }
  });

  // class methods
  Center.associate = ((models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      // as: 'events',
    });
  });

  Center.associate = (models) => {
    Center.belongsTo(models.User, {
      foreignKey: 'userId'
      // onDelete: 'CASCADE',
    });
  };

  return Center;
};
