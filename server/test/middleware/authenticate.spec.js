import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../../app';
import db from '../../models';

dotenv.config();

const { User } = db;
const request = supertest(app);
const apiBase = '/api/v1';

let token;

//**********************************//
//******** TEST AUTHENTICATE MIDDLEWARE ******* //
//**********************************//
describe('Authenticate middleware', () => {
  before(done => {
    User.create({
      username: 'thanos',
      email: 'thanos@gmail.com',
      password: '123456',
      isAdmin: true
    }).then(() => {
      request
        .post(`${apiBase}/users/login`)
        .send({ email: 'thanos@gmail.com', password: '123456' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          token = res.body.token;
          done();
        });
      });
    });

  it('should get token from req body', (done) => {
    request
      .get(`${apiBase}/users`)
      .send({
        email: 'thanos@gmail.com',
        password: 123456,
        token
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.users).to.be.an('array');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    request
      .get(`${apiBase}/users`)
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.users).to.be.undefined;
        expect(res.body.message).to.equal('You need to login to access this route');
        done();
      });
  });

  it('should get token from req headers', (done) => {
    request
      .get(`${apiBase}/users`)
      .set({ 'x-access-token': token })
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.users).to.be.an('array');
        done();
      });
  });

  it('should get token from Authorization header', (done) => {
    request
      .get(`${apiBase}/users`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.users).to.be.an('array');
        done();
      });
    });

  it('should get token from query', (done) => {
    request
      .get(`${apiBase}/users`)
      .query({ token })
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.users).to.be.an('array');
        done();
      });
    });

  it.skip('should return an error if secret is not provided', (done) => {
    request
      .get(`${apiBase}/users`)
      // .set({ 'x-access-token': token })
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Error the fuck up');
        done();
      });
    });

  it.skip('should return an error if secret is not the same as the one used to sign the token', (done) => {
    request
      .get(`${apiBase}/users`)
      .set({ 'x-access-token': token })
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Error the fuck up');
        done();
      });
    });

  it.skip('should decode the token', (done) => {
    request
      .get(`${apiBase}/users`)
      .set({ 'x-access-token': token })
      .send({
        email: 'thanos@gmail.com',
        password: 123456
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.users).to.be.an('array');
        expect(res.body.token).to.be.an('array');
        done();
      });
    });

    it('should return an error if the token is invalid', (done) => {
      // select * from÷
      request
        .get(`${apiBase}/users`)
        .set({ 'x-access-token': token+' ' })
        .send({
          email: 'thanos@gmail.com',
          password: 123456
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('invalid token');
          done();
        });
      });

    it.skip('should return an error if the user doesnt exist in the db', (done) => {
      // select * from÷
      request
        .get(`${apiBase}/users`)
        .set({ 'x-access-token': token+' ' })
        .send({
          email: 'thanos@gmail.com',
          password: 123456
        })
        .end((err, res) => {
          // expect(res.statusCode).to.equal(200);
          // expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Show me the errors :)');
          done();
        });
      });
});