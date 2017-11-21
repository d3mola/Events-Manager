export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Ruby',
      location: 'Lagos',
      capacity: 40000,
      price: 50000,
      isAvalaible: false,
      userId: 1
    }, {
      name: 'Silver',
      location: 'Ibadan',
      capacity: 70000,
      price: 100000,
      isAvalaible: false,
      userId: 2
    }, {
      name: 'Gold',
      location: 'Abuja',
      capacity: 50000,
      price: 60000,
      isAvalaible: true,
      userId: 3
    }, {
      name: 'Emerald',
      location: 'Kano',
      capacity: 50000,
      price: 60000,
      isAvalaible: true,
      userId: 4
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
