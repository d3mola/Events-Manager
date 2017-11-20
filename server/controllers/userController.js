import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import db from '../models';

dotenv.config();
const { User } = db;

export default {

  signup(req, res) {
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
            expiresIn: 1440 // expires in 5 mins
          });
          return res.json({
            success: true,
            message: 'Congrats!!! Registration succesfull! Enjoy your token!',
            token,
            user
          });
        })
        .catch(error => res.status(400).send(error.toString()));
    }).catch(error => res.status(500).send(error).toString());
  },

  // authenticate user

  login(req, res) {
    // check for empty username or password
    /* if (!req.body.username || !req.body.password) {
      return res.status(400).send('Incomplete credentials');
    } */

    // find the user, then send
    return User
      .findOne({
        where: {
          username: req.body.username,
        /*  password: req.body.password */
        }
      })
      .then((user) => {
        if (!user) {
          res.status(403).send('Incorrect username');
        } else if (user) {
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (!result) {
              res.status(403).send('Incorrect password');
            }

            const payload = {
              isAdmin: user.isAdmin,
              username: user.username
            };

            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 1440 // expires in 5 mins
            });

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token,
              user
            });
          }).catch();
        }
      }).catch(error => res.status(400).send({
        status: 'failure',
        error,
        message: 'Authentication failed',
      }));
    /*  .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send({
        status: 'failure',
        error,
        message: 'Authentication failed'
      })); */
  }
};
