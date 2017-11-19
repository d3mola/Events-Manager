import db from '../models';

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
    }).then((existingUser) => {
      if (existingUser && existingUser.username === req.body.username) {
        return res.status(400).send('Username taken!');
      }
      if (existingUser && existingUser.email === req.body.email) {
        return res.status(400).send('Another account uses this email!');
      }
      // if username/ password arent already taken, create the user
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      })
        .then(user => res.status(201).send({
          status: 'success',
          message: 'Congrats!!! Registration succesfully!',
          user
        }))
        .catch(error => res.status(400).send(error.toString()));
    }).catch(error => res.status(500).send(error).toString());

    /*  */
  },

  login(req, res) {
    // check for empty username or password
    if (!req.body.username/* || !req.body.password */) {
      return res.status(400).send('Incomplete credentials');
    }
    return User
      .findOne({
        where: {
          username: req.body.username,
          // password: req.body.password
        }
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};
