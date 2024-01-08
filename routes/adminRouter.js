import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.post('/signupmerchant', controller.signupMerchant);
router.post('/removeuser', controller.removeUser);


export default router;
