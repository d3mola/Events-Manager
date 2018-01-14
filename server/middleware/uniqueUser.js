const uniqueUserCheck = (req, res, next) => {
  if (user.id != req.user.userId) {
    res.status(401).json({
      success: false,
      message: "You can't view another user's page"
    });
  } else {
    next();
  }
};

export default uniqueUserCheck;