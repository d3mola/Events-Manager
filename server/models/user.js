import hashPwd from '../helpers/hashPwd';

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
          msg: 'Password should have a minimum of 6 characters'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  User.beforeCreate(user => hashPwd(user), { individualHooks: true });

  // for password change situation
  // User.beforeUpdate((user) => {
  //   if (user.changed('password')) {
  //     user = hashPwd(user);
  //   }
  // });

  User.associate = (models) => {
    User.hasMany(models.Event, {
      as: 'events',
      foreignKey: 'userId'
    },
  { onDelete: 'cascade', hooks: true }
);

    User.hasMany(models.Center, {
      foreignKey: 'userId'
    });
  };

  return User;
};
