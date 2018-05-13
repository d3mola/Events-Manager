import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../app';
import db from '../models';
import mockData from '../mock/mock';

dotenv.config();
const { Event, Center, User } = db;
const request = supertest(app);
const loginApi = '/api/v1/users/login';

describe('Event', () => {
  before(() => {
    User.create(mockData.admin);
    User.create(mockData.cunnyUser);
    Center.create(mockData.center2);
    // done();
  });

  describe('Seed events', () => {
    before(() => {
      Event.bulkCreate([
        mockData.birthday,
        mockData.wedding,
        mockData.convocation
      ])
      // .then(() => Event.findAll);
      // done();
      // .then(events => console.log(events));
    });

    describe('#GET /api/v1/users/auth/events', () => {
      it('should get all events created by this user', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .get('/api/v1/users/auth/events')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>*******************', res);
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.events).to.be.an('array');
                expect(res.body.events).to.have.lengthOf(3);
                done();
              });
          });
      });
      it('should fail to get events if user is not logged in', done => {
        request.get('/api/v1/users/auth/events').end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(
            'You need to login to access this route'
          );
          done();
        });
      });
      it('should fail to get events if a user has no events created', done => {
        request
          .post('/api/v1/users/login')
          .send(mockData.cunnyUser)
          .end((err, res) => {
            const token = res.body.token;
            request
              .get('/api/v1/users/auth/events')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('No events');
                done();
              });
          });
      });
    }); // end of #GET /api/v1/users/auth/events

    // get single event
    describe('#GET /api/v1/users/auth/events/:eventId', () => {
      it('should get a single event as specified by id', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .get('/api/v1/users/auth/events/2')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.event).to.be.an('object');
                expect(res.body.event.title).to.equal('wedding');
                done();
              });
          });
      });
      it('should fail to get events if a user tries to get another users events', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.cunnyUser.email, password: mockData.cunnyUser.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .get('/api/v1/users/auth/events/2')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Event does not exist');
                done();
              });
          });
      });
    }); // end of '#GET /api/v1/users/auth/events/:eventId'

    // create an event
    describe('#POST /api/v1/users/auth/events/', () => {
      it('should create a new event', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .post('/api/v1/events')
              .set({ 'x-access-token': token })
              .send(mockData.newEvent)
              .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Event created succesfully!');
                expect(res.body.event).to.be.an('object');
                expect(res.body.event.title).to.equal('newEvent');
                done();
              });
          });
      });
      it('should not create an event if chosen center does not exist', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .post('/api/v1/events')
              .set({ 'x-access-token': token })
              .send({ ...mockData.newEvent, centerId: 12 })
              .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Center does not exist!');
                expect(res.body.event).to.be.undefined;
                done();
              });
          });
      });
      it('notify user to fill all required fields if they dont', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .post('/api/v1/events')
              .set({ 'x-access-token': token })
              .send({ ...mockData.newEvent, title: '' })
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Title is required!');
                done();
              });
          });
      });
      it('notify user to fill all required fields if they dont', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .post('/api/v1/events')
              .set({ 'x-access-token': token })
              .send({ ...mockData.newEvent, centerId: '' })
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Center is required!');
                done();
              });
          });
      });
      it('notify user to fill all required fields if they dont', done => {
        request
          .post('/api/v1/users/login')
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .post('/api/v1/events')
              .set({ 'x-access-token': token })
              .send({ ...mockData.newEvent, date: '' })
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Date is required!');
                done();
              });
          });
      });
    }); //'#POST /api/v1/users/auth/events'

    // update event
    describe('#PUT /api/v1/events/:eventId', () => {
      it('should not update event if event doesnt exist', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .put('/api/v1/events/15')
              .set({ 'x-access-token': token })
              .send({ ...mockData.birthday, title: 'updated birthday' })
              .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Event does not exist!');
                done();
              });
          });
      });
      it('should not update event if user didnt create it', done => {
        request
          .post(loginApi)
          .send({email: mockData.cunnyUser.email, password: mockData.cunnyUser.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .put('/api/v1/events/1')
              .set({ 'x-access-token': token })
              .send({ ...mockData.birthday, title: 'updated birthday' })
              .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal(
                  "You're not authorized to access this route"
                );
                done();
              });
          });
      });
      it('should not update event if date and center is taken by another event', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .put('/api/v1/events/1')
              .set({ 'x-access-token': token })
              .send(mockData.clashWithBirthday)
              .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Center already booked!');
                done();
              });
          });
      });
      it('should not update event if required fields are not supplied', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .put('/api/v1/events/1')
              .set({ 'x-access-token': token })
              .send({ ...mockData.birthday, title: '', date: null })
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Title is required!');
                done();
              });
          });
      });
      it('should update event if all fields are supplied', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .put('/api/v1/events/1')
              .set({ 'x-access-token': token })
              .send({
                ...mockData.birthday,
                title: 'updated title',
                date: 2018 - 11 - 22,
                notes: 'updated Note'
              })
              .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Event updated succesfully!');
                expect(res.body.updatedEvent).to.be.an('object');
                expect(res.body.updatedEvent.title).to.equal('updated title');
                done();
              });
          });
      });
    }); //'#PUT /api/v1/users/auth/events/:eventId'

    // delete event
    describe('#DELETE /api/v1/events/:eventId', () => {
      it('should not delete event if user isnt logged in', done => {
        request.delete('/api/v1/events/3').end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(
            'You need to login to access this route'
          );
          done();
        });
      });
      it('should not delete event if user didnt create it', done => {
        request
          .post(loginApi)
          .send({email: mockData.cunnyUser.email, password: mockData.cunnyUser.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .delete('/api/v1/events/2')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal(
                  'You cannot delete this event'
                );
                done();
              });
          });
      });
      it('should not delete an event that doesnt exist', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .delete('/api/v1/events/8')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('Event does not exist');
                done();
              });
          });
      });
      it('should delete event successfully', done => {
        request
          .post(loginApi)
          .send({email: mockData.admin.email, password: mockData.admin.password})
          .end((err, res) => {
            const token = res.body.token;
            request
              .delete('/api/v1/events/3')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Event deleted succesfully');
                done();
              });
          });
      });
    }); //'#DELETE /api/v1/users/auth/events/:eventId'
  }); // end of Seed events
}); // end of Event
