import express from 'express';
import centerController from '../controllers/centerController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';
import ValidateInput from '../middleware/validateInput';

const router = express.Router();

router
  .route('/centers')
  .post(
    authenticate,
    adminCheck,
    ValidateInput.centerPayloadValidator,
    centerController.create
  )
  .get(authenticate, centerController.getAllCenters);

router
  .route('/centers/:centerId')
  .put(
    authenticate,
    adminCheck,
    ValidateInput.paramIdValidator,
    ValidateInput.centerPayloadValidator,
    centerController.update
  )
  .get(
    authenticate,
    ValidateInput.paramIdValidator,
    centerController.getACenter
  )
  .delete(
    authenticate,
    adminCheck,
    ValidateInput.paramIdValidator,
    centerController.deleteCenter
  );

  router.get('/search', centerController.searchCenter);

export default router;
