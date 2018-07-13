import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import _ from 'lodash';
import app from '../../app';
import db from '../../models';
import mockData from '../../mock/mock';

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
      ]);
    });

    describe('#GET /api/v1/users/auth/events', () => {
      it('should get all events created by this user', done => {
        request
          .post('/api/v1/users/login')
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
          .end((err, res) => {
            const token = res.body.token;
            request
              .get('/api/v1/users/auth/events')
              .set({ 'x-access-token': token })
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.payload.events).to.be.an('array');
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
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
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
      it(
        'should fail to get events if a user tries to get another users events',
        done => {
        request
          .post('/api/v1/users/login')
          .send({
            email: mockData.cunnyUser.email,
            password: mockData.cunnyUser.password
          })
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
      let token;
      before(done => {
        request
          .post('/api/v1/users/login')
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            token = res.body.token;
            done();
          });
      });

      it('should check length of title', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({
            ...mockData.newEvent,
            title: 'this title is too long so you see an error'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal(
              'Event title cannot exceed 20 characters!'
            );
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should check length of title', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({
            ...mockData.newEvent,
            notes: `this title is too long so you see an error jhvjyiyiu
            i need over a hundered characters so im just going to typejr
            in some gibberish  dsjkfdhdfsjkdsf jkdbvf dkjnbf jkdnf ewjkf
            bfdljnlfsknklvdhjfbk hjkjsdbefjkbdjnk  cvbjwljb;wjd jbc jikd
            cvjf kj cbwd  cqjk jwhffhhieh huirerwbkjervjkreregjkbwe fkjr
            ewrhjbrekjbrwejk jkbvhjjvhk jhvyivyhv jhvivhjvjh hjvk hjhkhk
            `
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal(
              'Note cannot exceed 100 characters!'
            );
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should check if title is a string', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({ ...mockData.newEvent, title: 43784 })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Title should be a string!');
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should check if notes is a string', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({ ...mockData.newEvent, notes: 78924 })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Notes should be a string!');
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should check if title is formatted correctly', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({ ...mockData.newEvent, title: 'not  proper' })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal(
              'Title is not correctly formatted!'
            );
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should ensure center id is an integer', done => {
        request
          .post('/api/v1/events')
          .set({ 'x-access-token': token })
          .send({ ...mockData.newEvent, centerId: 'badId' })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('CenterID should be an integer!');
            expect(res.body.event).to.not.be.an('object');
            done();
          });
      });

      it('should create a new event', done => {
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

      it('should not create an event if chosen center does not exist', done => {
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
      it('notify user to fill all required fields if they dont', done => {
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
      it('notify user to fill all required fields if they dont', done => {
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
      it('notify user to fill all required fields if they dont', done => {
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
    }); //'#POST /api/v1/users/auth/events'

    // update event
    describe('#PUT /api/v1/events/:eventId', () => {
      let token;
      before(done => {
        request
          .post('/api/v1/users/login')
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            token = res.body.token;
            done();
          });
      });

      it('should not update event if event doesnt exist', done => {
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

      it('should not update event if user didnt create it', done => {
        request
          .post(loginApi)
          .send({
            email: mockData.cunnyUser.email,
            password: mockData.cunnyUser.password
          })
          .end((err, res) => {
            request
              .put('/api/v1/events/1')
              .set({ 'x-access-token': res.body.token })
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

      it.skip(
        `should not update event if date and center is
        taken by another event by the same user`, done => {
        request
          .put('/api/v1/events/1')
          .set({ 'x-access-token': token })
          .send(mockData.clashWithBirthday)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Center already booked by you!');
            done();
          });
      });

      it(`
      should not update event if date and center is
      taken by another event by another user`, done => {
        request
          .post(loginApi)
          .send({
            email: 'normal@gmail.com',
            password: 'password1'
          })
          .end((err, res) => {
            request
              .put('/api/v1/events/4')
              .set({ 'x-access-token': res.body.token })
              .send({
                title: 'trying to update',
                notes: 'This update should fail',
                date: '2018-12-12'
              })
              .end((err, res) => {
                expect(res.body.message).to.equal(
                  "You're not authorized to access this route"
                );
                done();
              });
          });
      });

      it.skip('should not update event if required fields are not supplied',
      done => {
        request
          .put('/api/v1/events/1')
          .set({ 'x-access-token': token })
          .send(_.omit(mockData.birthday, 'title'))
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Title is required!');
            done();
          });
      });

      it('should update event if all fields are supplied', done => {
        request
          .put('/api/v1/events/1')
          .set({ 'x-access-token': token })
          .send({
            ...mockData.birthday,
            title: 'updated title',
            date: '2018-11-22',
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
          .send({
            email: mockData.cunnyUser.email,
            password: mockData.cunnyUser.password
          })
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
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
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
          .send({
            email: mockData.admin.email,
            password: mockData.admin.password
          })
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
