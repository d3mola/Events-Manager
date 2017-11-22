import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../app';

const request = supertest(app);
let data = {};
// const url = '/api/v1';
describe('User API', () => {
  describe('POST /users', () => {
    beforeEach(() => {
      data = {
        username: 'ademola1',
        password: '123243254',
        email: 'ademola1@gmail.com'
      };
    });
    it('should create a new user and return 201', (done) => {
      request.post('/api/v1/users')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Congrats!!! Registration succesfull! Enjoy your token!');
          done();
        });
    });

    it('should create a second user and return 201', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'demola',
          password: '123456',
          email: 'demola@gmail.com'
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

    it('should return 400 if the user eneters a pssword less than 6 characters', (done) => {
      request.post('/api/v1/users')
        .send({
          username: 'ademola4',
          password: '1234',
          email: 'ademola$@gmail.com'
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
          username: 'ademola5',
          password: '1234657',
          email: 'ademola1@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Another account uses this email!');
          done();
        });
    });
  }); // end of POST rreq
}); // end of USER API
