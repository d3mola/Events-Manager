module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Centers', [
      {
        name: 'Ruby',
        location: 'Lagos',
        capacity: 40000,
        price: 50000,
        isAvailable: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Silver',
        location: 'Ibadan',
        capacity: 70000,
        price: 100000,
        isAvailable: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gold',
        location: 'Abuja',
        capacity: 50000,
        price: 60000,
        isAvailable: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emerald',
        location: 'Kano',
        capacity: 50000,
        price: 60000,
        isAvailable: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Centers', null, {});
  }
};
