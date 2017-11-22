import faker from 'faker';

const data = {
  admin: {
    username: 'Demola',
    password: 'password',
    email: 'demola@gmail.com',
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
    password: 'password',
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
};

export default data;
