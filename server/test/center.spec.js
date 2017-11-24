import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../../app';
import db from '../models';

dotenv.config();
const { User } = db;
const request = supertest(app);
let adminToken;
let userToken;

describe('Center', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done(null);
    }).catch((error) => {
      done(error);
    });
  });
  beforeEach((done) => {
    User.create({
      username: 'ademola',
      email: 'ademola@gmail.com',
      password: 'password1',
      isAdmin: true
    })
      .then(() => {
        request
          .post('/api/v1/users/login')
          .send({ username: 'ademola', password: 'password1' })
          .end((err, res) => {
            expect(res.status).to.equal(202);
            adminToken = res.body.token;
            done();
          });
      });
  });

  beforeEach((done) => {
    User.create({
      username: 'normaluser',
      email: 'normal@gmail.com',
      password: 'password1'
    })
      .then(() => {
        request
          .post('/api/v1/users/login')
          .send({ username: 'normaluser', password: 'password1' })
          .end((err, res) => {
            expect(res.status).to.equal(202);
            userToken = res.body.token;
            done();
          });
      });
  });
  describe('POST / centers', () => {
    it('should create a new center and return 201', (done) => {
      request.post('/api/v1/centers')
        .send({
          name: 'Ruby Hall',
          location: 'Abuja',
          capacity: 30000,
          price: 1000000,
          token: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Center created succesfully!');
          done();
        });
    });
  });

  // adminCheck.js
  describe('POST / centers', () => {
    it('should send 400 if the user is not an admin', (done) => {
      request.post('/api/v1/centers')
        .send({
          name: 'Diamond Hall',
          location: 'Abuja',
          capacity: 30000,
          price: 1000000,
          token: userToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Unauthorized');
          done();
        });
    });
  });

  // authenticate.js
  describe('POST / centers', () => {
    it('should send 401 if the user is not authenticated', (done) => {
      request.post('/api/v1/centers')
        .send({
          name: 'Diamond Hall',
          location: 'Abuja',
          capacity: 30000,
          price: 1000000
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You need to login to access this route');
          done();
        });
    });
  });
/*
  describe('POST / centers', () => {
    it('should send 401 if the token isnt correct', (done) => {
      request.post('/api/v1/centers')
        .send({
          name: 'Diamond Hall',
          location: 'Abuja',
          capacity: 30000,
          price: 1000000,
          userToken: 'lkdfsgk;fd'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('token issues');
          done();
        });
    });
  }); */
});// end of center api
