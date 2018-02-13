import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../app';
import db from '../models';
// import mock from '../mock/mock';

dotenv.config();
const { User, Event, Center } = db;
const request = supertest(app);
let userToken1;
let adminToken;

describe('User', () => {

  before((done) => {
    User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      isAdmin: true
    })
      .then(() => {
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
    })
  })

  before((done) => {
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
          userToken1 = res.body.token;
          done();
          // console.log('-----------------', userToken1)
        });
    })
      .then(() => {
        Event.create({
          title: 'test event',
          notes: 'test note',
          centerId: 2,
          date: 2018-12-24,
          userId: 2
        });
        // console.log('-----------------', userToken1)
      });
  });

  describe('POST /users', () => {
    it('should create a new user and return 201', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'mary',
          password: 'marymary',
          email: 'mary@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Congrats!!! Registration succesfull! Enjoy your token!');
          done();
        });
    });

    it('should return 400 if the user enters a password less than 6 characters', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'ademola4',
          password: '1234',
          email: 'ademola4@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Password should be atleast 6 characters long!');
          done();
        });
    });

    it('should return 403 if the email is already taken', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'randonnname',
          password: '123456',
          email: 'ademola@gmail.com'
        })
        .end((err, res) => {
          // console.log(err);
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Another account uses this email!');
          done();
        });
    });

    it('should return 403 if the username is already taken', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'ademola',
          password: '123456',
          email: 'ademolaasdgfd@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username taken!');
          done();
        });
    });

    it('should create a second user and return 201', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'wura',
          password: '123456',
          email: 'wurawura@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Congrats!!! Registration succesfull! Enjoy your token!');
          done();
        });
    });

    it('should return 400 if the user omits a field', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'ademola3',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Please fill all the fields!');
          done();
        });
    });
  }); // end of signup

  // login test
  describe('POST /api/users/login', () => {
    it('return 200 when admin login is succesful', (done) => {
      request.post('/api/v1/users/login')
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

    it('return 403 if user doesnt exist', (done) => {
      request.post('/api/v1/users/login')
        .send({
          email: 'idontexist@gmail.com',
          password: 'password1'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Incorrect username');
          done();
        });
    });

    it('return 403 if passwords dont match', (done) => {
      request.post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com',
          password: 'password2'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Incorrect password');
          done();
        });
    });


    it('return 500 for incomplete credentials', (done) => {
      request.post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Incomplete credentials');
          done();
        });
    });

    it('return 200 for successful login', (done) => {
      request.post('/api/v1/users/login')
        .send({
          email: 'ademola@gmail.com',
          password: 'password1'
        })
        .end((err, res) => {
          // userToken1 = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Welcome ademola');
          done();
        });
    });
  }); // end of login
}); // end of USER API
