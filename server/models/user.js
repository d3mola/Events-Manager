import bcrypt from 'bcrypt';

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

  /* User.beforeCreate(user => bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      console.log(`Password is: ${user.password}`);
    }).catch(error => console.log(error)));

  User.afterValidate('myHookAfter', (user) => {
    bcrypt.compare(user.password, hash).then((res) => {
      user.password = hash;
    });
  }); */

  /**
   *  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: password => bcrypt.compareSync(password, this.password)
    }
  }); */

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
