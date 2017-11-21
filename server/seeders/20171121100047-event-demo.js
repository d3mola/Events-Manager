export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      title: 'Wedding',
      notes: 'Lorem ipsum yada yada',
      userId: 1
    }, {
      title: 'Burial',
      notes: 'Lorem ipsum yada yada',
      userId: 2
    }, {
      title: 'Wedding',
      notes: 'Lorem ipsum yada yada',
      userId: 4
    }, {
      title: 'Convocation',
      notes: 'Lorem ipsum yada yada',
      userId: 3
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
