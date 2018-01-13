import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import db from '../models';

dotenv.config();
const { User, Event } = db;

export default {

  /**
   * @description adds a new user to the database
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new user
   */
  signup: (req, res) => {
    const {
      username, password, email, isAdmin
    } = req.body;
    // check for empty password.. Add reqex to validate password later
    if (!password || !username || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the fields!'
      });
    }
    // check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password should be atleast 6 characters long!'
      });
    }

    // check if username/ email are already taken, then return error messages
    return User.find({
      where: {
        $or: [{ username }, { email }]
      }
    }).then((foundUser) => {
      if (foundUser && foundUser.username === username) {
        return res.status(403).json({
          success: false,
          message: 'Username taken!'
        });
      }
      if (foundUser && foundUser.email === email) {
        return res.status(403).json({
          success: false,
          message: 'Another account uses this email!'
        });
      }
      // if username/ password arent already taken, create the user
      User.create({
        username,
        email,
        password,
        isAdmin
      }) // generate token
        .then((user) => {
          const payload = {
            isAdmin: user.isAdmin,
            username: user.username,
            userId: user.id
          };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '24h' // expires in 24hrs
          });
          return res.status(201).json({
            success: true,
            message: 'Congrats!!! Registration succesfull! Enjoy your token!',
            token
          });
        });
    }).catch(error => res.status(500).json({
      success: false,
      error: error.message
    }));
  },


  /**
   * @description authenticates and logs in a user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} authenticated user
   */
  login: (req, res) => {
    const {
      email, password
    } = req.body;

    // validate user input
    if (!email || !password) {
      res.status(500).json({
        success: false,
        message: 'Incomplete credentials'
      });
      return;
    }
    User
      .findOne({
        where: {
          email
        }
      })
      .then((user) => {
        if (!user) {
          res.status(403).json({
            success: false,
            message: 'Incorrect username'
          });
        } else if (user) {
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              res.status(403).json({
                success: false,
                message: 'Incorrect password'
              });
            }

            const payload = {
              userId: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              email: user.email
            };

            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: '24h' // expires in 24hrs
            });

            res.status(200).json({
              success: true,
              message: `Enjoy your token! ${user.username}`,
              token
            });
          });
        }
      }).catch(error => res.status(400).json({
        success: false,
        error: error.message,
        message: 'Authentication failed',
      }));
  },

  // Get all users
  getAllUsers: (req, res) => User.findAll()
    .then((users) => {
      if (!users.length) {
        res.status(400).json({
          success: false,
          message: 'There are no users at this time'
        });
      } else {
        res.status(200).json({
          success: true,
          users
        });
      }
    })
    .catch(error => res.status(500).json({
      success: false,
      message: 'Could not get users',
      error: error.message
    })),

    getUserEvents: (req, res) => {
      // console.log('req--------->', req.params, req.user);
      // find user by id whic is gotten from the decoded token(req.user)
      User.find({
        where: { id: req.user.userId },
        include: [
          { model: Event, as: 'events' }
        ],
      })
        .then(user => {
          // if user doesnt exist, send error
          if (!user) {
            res.status(404).json({
              success: false,
              message: "No such user exists",
            });
            //if user exists send user
          } else if (user.events.length < 1) {
              res.status(404).json({
              success: false,
              message: "No events",
            });
          } else {
            res.status(200).json({
              success: true,
              user
            });
          }
        })
        .catch(error => res.status(500).json({
          success: false,
          error: error.message
        }));

    },

    getOneUserEvent: (req, res) => {
      const eventId = Number(req.params.eventId);
      // find user by id which is gotten from the decoded token
      User.find({
        where: { id: req.user.userId },
        include: [
          { model: Event, as: 'events' }
        ],
      })
        .then(user => {
          // if user doesnt exist, send error
          if (!user) {
            res.status(404).json({
              success: false,
              message: "User doesnt exist"
            });
            //if user exists send user
          } else if (!(user.events[eventId - 1]) || !(user.events[eventId - 1].id) || user.events.length < 1) {
            res.status(404).json({
              success: false,
              message: "No such event!"
            });
            // console.log(eventId);
          } else {
            res.status(200).json({
              success: true,
              event: user.events[eventId - 1]
            });
            // console.log(eventId);
          }
        })
        .catch(error => res.status(500).json({
          success: false,
          error: error.message
        }));
    },
};
