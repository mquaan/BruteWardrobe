import express from 'express';
import controller from '../controllers/customerController.js';

const router = express.Router();

router.get('/getinfo', controller.getCustomer);
router.post('/changepassword', controller.changePassword);
router.post('/updateinfo', controller.updateInfo);
router.post('/addtocart', controller.addToCart);
router.post('/getcart', controller.getCart);
router.post('/removefromcart', controller.removeFromCart);
router.post('/updatecartquantity', controller.updateCartQuantity);
router.post('/addorder', controller.addOrder);
router.post('/getorder', controller.getOrder);
router.post('/getorderlist', controller.getOrderList);
router.post('/payment', controller.payment);
router.get('/handlepayment', controller.handlePayment)

export default router;
