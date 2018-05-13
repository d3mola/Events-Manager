module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Events', [
      {
        title: 'Wedding',
        notes: 'Wedding ipsum yada yada',
        date: new Date,
        userId: 2,
        centerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Burial',
        notes: 'Burial ipsum yada yada',
        date: new Date,
        userId: 2,
        centerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Wedding',
        notes: 'Wedding ipsum yada yada',
        date: new Date,
        userId: 3,
        centerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Convocation',
        notes: 'Convocation ipsum yada yada',
        date: new Date,
        userId: 3,
        centerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
