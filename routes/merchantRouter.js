import express from 'express';
import controller from '../controllers/merchantController.js';
const router = express.Router();

router.post('/editproductlist', controller.editProductList);

export default router;
