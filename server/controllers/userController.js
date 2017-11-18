import db from '../models';

const User = db.User;

export default {

  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error.toString()));
  },

  login(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        }
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};
