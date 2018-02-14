import faker from 'faker';
// const faker = require('faker')

const data = {
  admin: {
    username: 'admin1',
    password: 'password',
    email: 'admin1@gmail.com',
    isAdmin: true,
  },
  wrongEmail: {
    username: 'Demola',
    password: 'password',
    email: 'wrongemail@gmail.com',
    isAdmin: true,
  },
  wrongPassword: {
    username: 'Demola',
    password: 'wrongpassword',
    email: 'demola@gmail.com',
    isAdmin: true,
  },
  newUser: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
  },
  newUser2: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
    // password: 'password',
  },
  cunnyUser: {
    username: 'cunnyUser',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  existingEmail: {
    username: 'baba',
    email: 'demola@gmail.com',
    password: 'password'
  },
  existingUsername: {
    username: 'Demola',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password'
  },
  nonExistentUsername: {
    username: 'Notdemola',
    password: 'password'
  },
  center3: {
    userId: 1,
    name: 'third hall',
    location: 'ghana',
    capacity: 1000,
    price: 20000,
  },
  center2: {
    userId: 2,
    name: 'second hall',
    location: 'liberia',
    capacity: 2000,
    price: 30000,
  },
  birthday: {
    title: 'birthday',
    notes: 'dummy bithday note',
    centerId: 2,
    date: '2018-12-03',
    userId: 3
  },
  wedding: {
    title: 'wedding',
    notes: 'dummy wedding note',
    centerId: 2,
    date: '2018-12-04',
    userId: 3
  },
  convocation: {
    title: 'convocation',
    notes: 'dummy convocation note',
    centerId: 2,
    date: '2018-12-05',
    userId: 3
  },
  newEvent: {
    title: 'newEvent',
    notes: 'dummy newEvent note',
    centerId: 2,
    date: '2018-12-10',
    userId: 3
  },
  clashWithBirthday: {
    title: 'clashWithBirthday',
    notes: 'dummy clashWithBirthday note',
    centerId: 2,
    date: '2018-12-03',
    userId: 3
  }
};

// console.log('fake data', data.newUser2)

export default data;
