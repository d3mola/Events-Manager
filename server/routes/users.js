import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// testing the MVR link
router.get('/', (req, res) => {
  res.send('Welcome to Party Palace API');
});

router.post('/users', userController.create);

export default router;
