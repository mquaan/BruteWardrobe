import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.post('/signupmerchant', controller.signupMerchant);

export default router;
