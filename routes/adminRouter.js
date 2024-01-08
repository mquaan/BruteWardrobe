import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.post('/signupmerchant', controller.signupMerchant);
router.post('/addsale', controller.addSale);
router.get('/getaccountnumber', controller.getAccountNumber);
router.get('/gettotalrevenue', controller.getTotalRevenue);
router.get('/countcustomers', controller.countCustomers);
router.get('/countsales', controller.countSales);

export default router;
