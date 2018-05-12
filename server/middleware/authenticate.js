import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
    (req.headers.Authorization && req.headers.Authorization.slice(7)) ||
    req.query.token;

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error || !decoded) {
        return res.status(401).json({
          success: false,
          message: error.message || 'token issues',
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'You need to login to access this route'
    });
  }
};

export default authenticate;
