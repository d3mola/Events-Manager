import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../../app';
import db from '../models';
// import mock from '../mock/mock';

dotenv.config();
const { User } = db;
const request = supertest(app);
// let data = {};
// const url = '/api/v1';
describe('User', () => {
  // let regularToken, adminToken;
  /* beforeEach((done) => {
    db.User.destroy({
      where: {}
    });
    done();
  }); */
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
    });
    done();
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

    it('should return 400 if the user eneters a pssword less than 6 characters', (done) => {
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

    it('should return 403 if the username is alredy taken', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'ademola',
          password: '123456',
          email: 'ademolaasdgfd@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
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
      /* const badData = Object.assign({}, data);
      badData.username = 'demola';
      badData.password = '123456';
      badData.email = 'another@gmail.com'; */
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
  }); // end of POST rreq
}); // end of USER API
