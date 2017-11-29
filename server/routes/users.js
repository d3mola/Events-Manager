import express from 'express';
import path from 'path';
import userController from '../controllers/userController';

const router = express.Router();

// testing the MVR link
router.get('/', (req, res) => {
  res.send('Welcome to Party Palace API');
});

router.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

router.post('/users', userController.signup);
router.post('/users/login', userController.login);

export default router;
