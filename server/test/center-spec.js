import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../../app';
import db from '../models';

dotenv.config();
const { User } = db;
const request = supertest(app);
let adminToken;

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
    // done();//
  });
  describe('POST / centers', () => {
    it.only('should create a new center and return 201', (done) => {
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
});// end of center api
