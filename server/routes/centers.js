import express from 'express';
import centerController from '../controllers/centerController';

const router = express.Router();

router.post('/centers', centerController.create);

export default router;
