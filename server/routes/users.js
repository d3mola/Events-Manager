import express from 'express';
import userController from '../controllers/userController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';
import ValidateInput from '../middleware/validateInput';

const router = express.Router();

// testing the MVR link
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Party Palace API' });
});

router.post('/users', ValidateInput.signupValidator, userController.signup);
router.post('/users/login', ValidateInput.loginValidator, userController.login);
router.get('/users', authenticate, adminCheck, userController.getAllUsers);

router.get('/users/logout', userController.logout);
export default router;
