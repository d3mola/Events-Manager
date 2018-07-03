import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import db from '../models';

dotenv.config();
const { User, Event } = db;

export default {
  /**
   * @description adds a new user to the database
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} new user
   */
  signup: (req, res) => {
    const { username, password, email } = req.body;

    // check if username/ email are already taken, then return error messages
    return User.find({
      where: {
        $or: [{ username }, { email }]
      }
    })
      .then(foundUser => {
        if (foundUser && foundUser.username === username) {
          return res.status(409).json({
            success: false,
            message: 'Username taken!'
          });
        }
        if (foundUser && foundUser.email === email) {
          return res.status(409).json({
            success: false,
            message: 'Another account uses this email!'
          });
        }
        // if username/ password arent already taken, create the user
        User.create({
          username,
          email,
          password,
          // isAdmin
        }) // generate token
          .then(user => {
            const payload = {
              isAdmin: user.isAdmin,
              username: user.username,
              userId: user.id,
              email: user.email
            };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: '24h' // expires in 24hrs
            });

            user.password = undefined;
            
            return res.status(201).json({
              success: true,
              message: 'Congrats!!! Registration succesfull! Enjoy your token!',
              token,
              user
            });
          })
          .catch(error =>
            res.status(500).json({
              success: false,
              error:
                error.errors[0].message ||
                error.message ||
                'Internal server error'
            })
          );
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          error: error.message || 'Internal server error!'
        })
      );
  },

  /**
   * @description authenticates and logs in a user
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} authenticated user
   */
  login: (req, res) => {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (!user) {
          res.status(401).json({
            success: false,
            message: 'Username or email is incorrect!'
          });
        } else if (user) {
          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (!result) {
                return res.status(401).json({
                  success: false,
                  message: 'Username or email is incorrect!'
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

              user.password = undefined;
              
              return res.status(200).json({
                success: true,
                message: `Welcome ${user.username}`,
                token,
                user
              });
            })
            .catch(error =>
              res.status(500).json({
                success: false,
                error: error.message
              })
            );
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          error: error.message || 'Unable to access the database'
        })
      );
  },

  /**
   * @description gets all users in the db
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {array} all users
   */
  getAllUsers: (req, res) =>
    User.findAll()
      .then(users => {
          res.status(200).json({
            success: true,
            users
          });
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          message: 'Could not get users',
          error: error.message
        })
      ),

  getOneUserEvent: (req, res) => {
    Event.find({
      where: { id: req.params.eventId }
    })
      .then(event => {
        // compare userId in req.user which is from decoded token
        // to userId of the event,
        if (!event || event.userId !== req.user.userId) {
          res.status(404).json({
            success: false,
            message: 'Event does not exist'
          });
        } else {
          res.status(200).json({
            success: true,
            event
          });
        }
      })
      .catch(error =>
        res.status(500).json({
          success: false,
          error: error.message
        })
      );
  },

  logout: (req, res) => res.status(200).json({ token: null })
};
