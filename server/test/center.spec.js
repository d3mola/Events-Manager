import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../app';
import db from '../models';
import mockData from '../mock/mock';

dotenv.config();
const { User, Center } = db;
const request = supertest(app);
let adminToken;
let userToken;

describe('Center', () => {
  before((done) => {
    User.create({
      username: 'ademola',
      email: 'ademola@gmail.com',
      password: 'password1',
      isAdmin: true
    })
      .then(() => {
        request
          .post('/api/v1/users/login')
          .send({ email: 'ademola@gmail.com', password: 'password1' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = res.body.token;
            done();
          });
      });
  });

  before((done) => {
    User.create({
      username: 'normaluser',
      email: 'normal@gmail.com',
      password: 'password1'
    })
      .then(() => {
        request
          .post('/api/v1/users/login')
          .send({ email: 'normal@gmail.com', password: 'password1' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            userToken = res.body.token;
            done();
          });
      });
  });

  // fetch centers when none exists
  describe('#GET / centers', () => {
    it('should return 404 if no centers exist', (done) => {
      request.get('/api/v1/centers')
        .send({
          token: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('There are no centers at this time');
          done();
        });
    });
  });

  // create centers
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

  // fetch centers if they exist
  describe('#GET / centers', () => {
    it('should fetch all centers', (done) => {
      request.get('/api/v1/centers')
        .send({
          token: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.centers).to.be.an('array');
          done();
        });
    });
  });

  // fetch single center with specified id if they exist
  describe('#GET /centers/:id', () => {
    it('return an error if the specified center doesnt exist', (done) => {
      request.get('/api/v1/centers/44')
        .send({
          token: adminToken,
          centerId: 44
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.be.equal('Center doesnt exist');
          done();
        });
    });

    it('should fetch all centers', (done) => {
      request.get('/api/v1/centers/1')
        .send({
          token: adminToken,
          centerId: 44
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.center).to.be.an('object');
          done();
        });
    });

    it('should return 400 for invalid id', (done) => {
      request.get('/api/v1/centers/invalid')
        .send({
          token: adminToken,
          centerId: 44
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.be.equal('Id should be an integer');
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
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You need to login to access this route');
          done();
        });
    });
  });

  it('should send 400 if the admin doesnt enter the center capacity', (done) => {
    request.post('/api/v1/centers')
      .send({
        name: 'Diamond Hall',
        location: 'Abuja',
        token: adminToken
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Center price is required!');
        done();
      });
  });

  it('should send 400 if the admin doesnt enter a center name', (done) => {
    request.post('/api/v1/centers')
      .send({
        location: 'Abuja',
        capacity: 30000,
        token: adminToken
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Center name is required!');
        done();
      });
  });
  it('should send 400 if the admin doesnt enter a location', (done) => {
    request.post('/api/v1/centers')
      .send({
        name: 'Sapphire',
        capacity: 30000,
        token: adminToken
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Center location is required!');
        done();
      });
  });

  // update center
  describe('PUT / centers/:centerId', () => {
    it('should update a center', (done) => {
      request.put('/api/v1/centers/1')
        .send({
          name: 'Diamond Hall',
          location: 'Lagos',
          capacity: 3333,
          price: 3333,
          token: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Center updated succesfully!');
          expect(res.body.updatedCenter.name).to.equal('Diamond Hall');
          expect(res.body.updatedCenter).to.be.an('object');
          done();
        });
    });

    it('should return 404 if the center doesnt exist', (done) => {
      request.put('/api/v1/centers/4')
        .send({
          name: 'Diamond Hall',
          location: 'Lagos',
          capacity: 3333,
          price: 3333,
          token: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Center doesnt exist');
          expect(res.body.updatedCenter).to.be.undefined;
          done();
        });
    });
  });

    // delete center
    describe('#DELETE / centers/:centerId', () => {
      it('should return 404 if center does not exist', (done) => {
        request.delete('/api/v1/centers/4')
          .send({
            token: adminToken
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Center doesnt exist');
            done();
          });
      });
  
      it('should delete center', (done) => {
        request.delete('/api/v1/centers/1')
          .send({
            token: adminToken
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Center deleted succesfully!');
            done();
          });
      });
    });

});// end of center api
