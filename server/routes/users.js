import express from 'express';
import userController from '../controllers/userController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';

const router = express.Router();

// testing the MVR link
router.get('/', (req, res) => {
  res.send('Welcome to Party Palace API');
});

router.post('/users', userController.signup);
router.post('/users/login', userController.login);
router.get('/users', authenticate, adminCheck, userController.getAllUsers);

export default router;
