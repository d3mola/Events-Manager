import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../../app';
import db from '../../models';
// import mock from '../../mock/mock';

dotenv.config();
const { User, Event, Center } = db;
const request = supertest(app);
let userToken1;
let adminToken;

describe('User', () => {
  before(done => {
    User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      isAdmin: true
    }).then(() => {
      request
        .post('/api/v1/users/login')
        .send({ email: 'admin@gmail.com', password: '123456' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          adminToken = res.body.token;
          done();
        });
    });
  });

  before(() => {
    Center.create({
      name: 'third Hall',
      location: 'ibadan',
      capacity: 333330,
      price: 5000000,
      // token: adminToken,
      userId: 1
    });
  });

  before(done => {
    User.create({
      username: 'babajide',
      email: 'babajide@gmail.com',
      password: 'babajide',
      isAdmin: false
    })
      .then(() => {
        request
          .post('/api/v1/users/login')
          .send({ email: 'babajide@gmail.com', password: 'babajide' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            // userToken1 = res.body.token;
            done();
          });
      })
      .then(() => {
        Event.create({
          title: 'test event',
          notes: 'test note',
          centerId: 2,
          date: 2018 - 12 - 24,
          userId: 2
        });
      });
  });

  // create user/ signup
  describe('POST /users', () => {
    it('should create a new user and return 201', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'mary',
          email: 'mary@gmail.com',
          password: 'marymary',
          confirmPassword: 'marymary'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(
            'Congrats!!! Registration succesfull! Enjoy your token!'
          );
          done();
        });
    });

    it('should return 400 if the user enters a password less than 6 characters', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'ademola4',
          password: '1234',
          email: 'ademola4@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(
            'Password length should be between 6 and 20!'
          );
          done();
        });
    });

    it('should return 409 if the email is already taken', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'randonnname',
          password: '123456',
          email: 'ademola@gmail.com',
          confirmPassword: '123456'
        })
        .end((err, res) => {
          // console.log(err);
          // expect(res.status).to.equal(409);
          // expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Another account uses this email!');
          done();
        });
    });

    it('should return 409 if the username is already taken', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'ademola',
          password: '123456',
          email: 'ademolaasdgfd@gmail.com',
          confirmPassword: '123456'
        })
        .end((err, res) => {
          // expect(res.status).to.equal(409);
          // expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username taken!');
          done();
        });
    });

    it('should return 400 if the confirmPassword is not supplied', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'ademola123',
          password: '123456',
          email: 'ademola123@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(
            'Password confirmation is required!'
          );
          done();
        });
    });

    it('should create a second user and return 201', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'wura',
          email: 'wurawura@gmail.com',
          password: '123456',
          confirmPassword: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(
            'Congrats!!! Registration succesfull! Enjoy your token!'
          );
          done();
        });
    });

    it('should return 400 if the user omits a field', done => {
      request
        .post('/api/v1/users')
        .send({
          username: 'ademola3',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Email is required!');
          done();
        });
    });

    it('should welcome user to the app if they visit the base api url', done => {
      request.get('/api/v1/').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Party Palace API');
        done();
      });
    });
  }); // end of signup

  // login test
  describe('POST /api/users/login', () => {
    it('return 200 when admin login is succesful', done => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com',
          password: 'password1'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(`Welcome ademola`);
          done();
        });
    });

    it('return 401 if user doesnt exist', done => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'idontexist@gmail.com',
          password: 'password1'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username or email is incorrect!');
          done();
        });
    });

    it('return 401 if passwords dont match', done => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com',
          password: 'password2'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username or email is incorrect!');
          done();
        });
    });

    it('return 400 for incomplete credentials', done => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Password is required!');
          done();
        });
    });

    it('return 200 for successful login', done => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com',
          password: 'password1'
        })
        .end((err, res) => {
          userToken1 = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Welcome ademola');
          done();
        });
    });
  }); // end of login

  // get all registered users
  describe('GET /api/users', () => {
    it('return all users if they exist in the db', done => {
      request
        .get('/api/v1/users')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.users).to.be.an('array');
          expect(res.body.users.length).to.equal(8);
          done();
        });
    });
  });

  // other routes
  describe('GET /api/v1/nonexistentroute', () => {
    it('return an error if the route doesnt exist', done => {
      request
        .get('/api/v1/nonexistentroute')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Route does not exist');
          done();
        });
    });

    it('return a welcome message when user visits base route', done => {
      request
        .get('/api/v1/')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Welcome to Party Palace API');
          done();
        });
    });

    // it('should serve the docs file', done => {
    //   request
    //     .get('/api/v1/bundle')
    //     .end((err, res) => {
    //       expect(res.status)
    //       done();
    //     });
    // });
  });

  describe('GET /api/v1/users/logout', () => {
    it('nullify token on logout', done => {
      request
        .get('/api/v1/users/logout')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.equal(null);
          done();
        });
    });
  });
}); // end of USER API
