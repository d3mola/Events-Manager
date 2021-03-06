/**
 * checks if a user is an admin
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next pass control to next middleware
 * @return {several} next or error
 */
const adminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized to access this page'
    });
  }
};

export default adminCheck;
