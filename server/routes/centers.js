import express from 'express';
import centerController from '../controllers/centerController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';

const router = express.Router();

router.post('/centers', authenticate, adminCheck, centerController.create);

export default router;
