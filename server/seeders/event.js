export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      title: 'Wedding',
      notes: 'Lorem ipsum yada yada',
      date: '2018-12-01',
      centerId: 1,
      userId: 1
    }, {
      title: 'Burial',
      notes: 'Lorem ipsum yada yada',
      date: '2018-12-02',
      centerId: 1,
      userId: 1
    }, {
      title: 'Wedding',
      notes: 'Lorem ipsum yada yada',
      date: '2018-12-03',
      centerId: 2,
      userId: 2
    }, {
      title: 'Convocation',
      notes: 'Lorem ipsum yada yada',
      date: '2018-12-04',
      centerId: 2,
      userId: 2
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
