import express from 'express';
import centerController from '../controllers/centerController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';

const router = express.Router();

router.post('/centers', authenticate, adminCheck, centerController.create);

router.put('/centers/:centerId', authenticate, adminCheck, centerController.update);

export default router;
