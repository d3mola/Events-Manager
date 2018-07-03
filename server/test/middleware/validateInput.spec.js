import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import _ from 'lodash';
import app from '../../app';
import db from '../../models';

dotenv.config();

const { User } = db;
const request = supertest(app);
const apiBase = '/api/v1';

let token;

const user = {
  username: 'hulk',
  email: 'hulk@gmail.com',
  password: '123456'
};

const loggedInUser = {
  username: 'thanos',
  email: 'thanos@gmail.com',
  password: '123456'
}

//**********************************//
//******** TEST INPUT VALIDATOR ******* //
//**********************************//
describe('Input Validator Suite > ', () => {
  before(done => {
    request
      .post(`${apiBase}/users/login`)
      .send({ email: 'thanos@gmail.com', password: '123456' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        token = res.body.token;
        done();
      });
  });
  // sign up validator
  describe('Sign up validation > ', () => {
    it('should require username on signup', done => {
      request
        .post(`${apiBase}/users`)
        .send(_.omit(user, 'username'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Username is required!');
          done();
        });
    });

    it('should check if the length of the username < 2', done => {
      request
        .post(`${apiBase}/users`)
        .send({ ...user, username: 'e' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal(
            'Username length should be between 6 and 20!'
          );
          done();
        });
    });

    it('should check length of the username > 20', done => {
      request
        .post(`${apiBase}/users`)
        .send({ ...user, username: 'Unusually long username eee' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal(
            'Username length should be between 6 and 20!'
          );
          done();
        });
    });

    it('should check format of email', done => {
      request
        .post(`${apiBase}/users`)
        .send({ ...user, email: 'bademail.format' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Email is not valid!');
          done();
        });
    });

    it('should require email on signup', done => {
      request
        .post(`${apiBase}/users`)
        .send(_.omit(user, 'password'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Password is required!');
          done();
        });
    });
  }); // end of sign up validator

  // login validator
  describe('Signion Validator > ', () => {
    it('should require email on login', (done) => {
      request
        .post(`${apiBase}/users/login`)
        .send(_.omit(loggedInUser, 'email' ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Email is required!');
          done();
        });
    });

    it('should require password on login', (done) => {
      request
        .post(`${apiBase}/users/login`)
        .send(_.omit(loggedInUser, 'password' ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Password is required!');
          done();
        });
    });
  });// end of login validator

  // paramId validator
  describe('ParamId Validator > ', () => {
    it('should check length of the parameter', (done) => {
      request
        .get(`${apiBase}/centers/13187249238931245`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Parameter too long');
          done();
        });
    });

    it('should check if param is an interger', (done) => {
      request
        .get(`${apiBase}/centers/'dfedf'`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Id should be an integer');
          done();
        });
    });
  });// end of paramId validator

  // center payload validator
  describe.skip('Center payload Validator > ', () => {
    it('should check length of the parameter', (done) => {
      request
        .get(`${apiBase}/centers/13187249238931245`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Parameter too long');
          done();
        });
    });

    it('should check if param is an interger', (done) => {
      request
        .get(`${apiBase}/centers/'dfedf'`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Id should be an integer');
          done();
        });
    });
  });// end of center payload  validator
});
