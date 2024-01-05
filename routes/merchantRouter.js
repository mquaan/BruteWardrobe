import express from 'express';
import controller from '../controllers/merchantController.js';
const router = express.Router();

router.post('/editproductlist', controller.editProductList);
router.post('/removeproduct', controller.removeProduct);

export default router;
