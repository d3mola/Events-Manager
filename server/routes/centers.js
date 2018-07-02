import express from 'express';
import centerController from '../controllers/centerController';
import authenticate from '../middleware/authenticate';
import adminCheck from '../middleware/adminCheck';
import ValidateInput from '../middleware/validateInput';
import parseImageUpload from '../middleware/parseImageUpload';


const router = express.Router();

router
  .route('/centers')
  .post(
    authenticate,
    adminCheck,
    parseImageUpload(),
    ValidateInput.centerPayloadValidator,
    centerController.create
  )
  .get(
    centerController.getAllCenters
  );

router
  .route('/centers/:centerId')
  .put(
    authenticate,
    adminCheck,
    parseImageUpload(),
    ValidateInput.paramIdValidator,
    ValidateInput.centerPayloadValidator,
    centerController.update
  )
  .get(
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
