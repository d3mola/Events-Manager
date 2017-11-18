export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  User.associate = ((models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
      // as: 'events',
    });
  });

  User.associate = ((models) => {
    User.hasMany(models.Center, {
      foreignKey: 'userId',
      // as: 'centers',
    });
  });

  return User;
};
