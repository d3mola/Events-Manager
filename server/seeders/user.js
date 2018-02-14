export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'user1',
      email: 'user1@demo.com',
      password: '123456',
      isAdmin: true
    }, {
      username: 'user2',
      email: 'user2@demo.com',
      password: '123456',
      isAdmin: false
    }, {
      username: 'user3',
      email: 'user3@demo.com',
      password: '123456',
      isAdmin: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
