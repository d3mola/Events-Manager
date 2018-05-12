import express from 'express';
import eventController from '../controllers/eventController';
import userController from '../controllers/userController';
import authenticate from '../middleware/authenticate';
import ValidateInput from '../middleware/validateInput';

const router = express.Router();

router.post(
  '/events',
  authenticate,
  ValidateInput.eventPayloadValidator,
  eventController.createEvent
);

router
  .route('/events/:eventId')
  .put(
    authenticate,
    ValidateInput.paramIdValidator,
    ValidateInput.eventPayloadValidator,
    eventController.updateEvent
  )
  .delete(
    authenticate,
    ValidateInput.paramIdValidator,
    eventController.deleteEvent
  );

router.get(
  '/users/auth/events/:eventId',
  authenticate,
  ValidateInput.paramIdValidator,
  userController.getOneUserEvent
);

router.get('/users/auth/events', authenticate, userController.getUserEvents);

export default router;
