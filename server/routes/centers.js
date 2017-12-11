import express from 'express';
import path from 'path';
import centerController from '../controllers/centerController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';

const router = express.Router();

router.post('/centers', authenticate, adminCheck, centerController.create);

router.get('/centers', authenticate, centerController.getAllCenters);

router.put('/centers/:centerId', authenticate, adminCheck, centerController.update);

router.get('/centers/:centerId', authenticate, centerController.getACenter);

export default router;