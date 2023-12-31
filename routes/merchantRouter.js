import express from 'express';
import controller from '../controllers/merchantController.js';
const router = express.Router();

router.get('/getinfo', controller.getMerchant);
router.post('/updateinfo', controller.updateInfo);
router.post('/editproductlist', controller.editProductList);
router.post('/removeproduct', controller.removeProduct);
router.post('/editorderstatus', controller.editOrderStatus);
router.post('/cancelorder', controller.cancelOrder);
router.post('/updatepassword', controller.updatePassword);

export default router;
