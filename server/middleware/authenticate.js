import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;
dotenv.config();

/**
 * @description checks if a user has access based on their token
 *
 * @param {object} req - request
 * @param {object} res - response
 * @param {function} next - calls next middleware
 *
 * @return {object} status code, token, error, message
 */
const authenticate = (req, res, next) => {
  const token =
    req.body.token ||
    req.headers['x-access-token'] ||
    (req.headers.authorization && req.headers.authorization.slice(7)) ||
    req.query.token;

  if (token) {

    // if user is not in the db, throw err and delete token


    // else decode token

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error || !decoded) {
        return res.status(401).json({
          success: false,
          message: error.message || 'token issues',
        });
      }
      // console.log(decoded);
      req.user = decoded;
      const { userId } = decoded;

      User.findById(userId).then(user => {
        if(!user) {
          return res.status(404).json({
            success: false,
            message: 'User does not exist!'
          })
        }
        next();
      }).catch({
        success: false,
        message: 'Something went wrong, could not query user'
      });

    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'You need to login to access this route'
    });
  }
};

export default authenticate;
