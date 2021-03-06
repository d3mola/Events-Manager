export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Center name already exists!'
      },
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
      type: DataTypes.FLOAT,
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
    imageUrl: DataTypes.STRING,
    imageId: DataTypes.STRING,
  });

  // class methods
  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      as: 'events',
      foreignKey: 'centerId'
    });

    Center.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Center;
};
