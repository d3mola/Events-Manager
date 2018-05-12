const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'Demola',
    email: 'demola@test.com',
    password: bcrypt.hashSync(process.env.SEEDED_USER_PASS, 10),
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    username: 'Adam',
    email: 'adam@test.com',
    password: bcrypt.hashSync(process.env.SEEDED_USER_PASS, 10),
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    username: 'Leke',
    email: 'leke@test.com',
    password: bcrypt.hashSync(process.env.SEEDED_USER_PASS, 10),
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', [{
    username: 'Demola'
  }])
};
