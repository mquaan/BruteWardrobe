import express from 'express';
import controller from '../controllers/merchantController.js';
const router = express.Router();

router.post('/editproductlist', controller.editProductList);
router.post('/editorderstatus', controller.editOrderStatus);
router.post('/cancelorder', controller.cancelOrder);

router.post('/removeproduct', controller.removeProduct);

export default router;
