export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username taken! Please enter a new username.'
      },
      validate: {
        is: {
          args: /^[a-zA-Z0-9_]*$/,
          msg: 'No spaces or symbols allowed!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists!'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 20],
          msg: 'Minimum of 6 characters'
        }
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
