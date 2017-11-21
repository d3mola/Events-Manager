export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'demola',
      email: 'demola@demo.com',
      password: 'demola',
      isAdmin: true
    }, {
      username: 'adam',
      email: 'adam@demo.com',
      password: 'adamadam',
      isAdmin: false
    }, {
      username: 'leke',
      email: 'leke@demo.com',
      password: 'lekeleke',
      isAdmin: false
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
