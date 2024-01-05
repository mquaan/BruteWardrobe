import express from 'express';
import controller from '../controllers/merchantController.js';
const router = express.Router();

router.post('/editproductlist', controller.editProductList);
router.post('/editorderstatus', controller.editOrderStatus);
router.post('/cancelorder', controller.cancelOrder);


export default router;
