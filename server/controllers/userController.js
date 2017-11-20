import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import db from '../models';

dotenv.config();
const { User } = db;

export default {

  signup: (req, res) => {
    // check for empty password.. Add reqex to validate password later
    if (!req.body.password) {
      return res.status(400).send('Enter a password! (`_`)/```');
    }
    // check password length
    if (req.body.password.length < 6) {
      return res.status(400).send('Password should be atleast 6 characters long!');
    }

    // check if username/ email are already taken, then return error messages
    return User.find({
      where: {
        $or: [{ username: req.body.username }, { email: req.body.email }]
      }
    }).then((foundUser) => {
      if (foundUser && foundUser.username === req.body.username) {
        return res.status(403).send('Username taken!');
      }
      if (foundUser && foundUser.email === req.body.email) {
        return res.status(403).send('Another account uses this email!');
      }
      // if username/ password arent already taken, create the user
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      }) // generate token
        .then((user) => {
          const payload = {
            isAdmin: user.isAdmin,
            username: user.username
          };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '24h' // expires in 24hrs
          });
          return res.json({
            success: true,
            message: 'Congrats!!! Registration succesfull! Enjoy your token!',
            token,
            user
          });
        })
        .catch(error => res.status(400).json({
          success: false,
          message: error
        }));
    }).catch(error => res.status(500).json({
      success: false,
      message: error
    }));
  },

  // authenticate user

  login: (req, res) =>
    // find the user, then send
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (!user) {
          res.status(403).send('Incorrect username');
        } else if (user) {
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (!result) {
              res.status(403).json({
                success: false,
                message: 'Incorrect password'
              });
            }

            const payload = {
              id: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              email: user.email
            };

            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: '24h' // expires in 24hrs
            });

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token,
              user
            });
          }).catch();
        }
      }).catch(error => res.status(400).json({
        status: 'failure',
        error,
        message: 'Authentication failed',
      }))

};
