import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.post('/signupmerchant', controller.signupMerchant);
router.post('/removeuser', controller.removeUser);
router.post('/banunbanuser', controller.ban_unban_User);
router.post('/addsale', controller.addSale);

export default router;
