import express from 'express';
import eventController from '../controllers/eventController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/events', authenticate, eventController.createEvent);

router.put('/events/:eventId', authenticate, eventController.updateEvent);

// router.delete('/events/:eventId', authenticate, eventController.deleteEvent);

export default router;
