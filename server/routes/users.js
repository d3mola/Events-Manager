import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// testing the MVR link
router.get('/', (req, res) => {
  res.send('Welcome to Party Palace API');
});

router.post('/users', userController.signup);
router.post('/users/login', userController.login);

export default router;
