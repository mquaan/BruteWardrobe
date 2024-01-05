import express from 'express';
import controller from '../controllers/customerController.js';

const router = express.Router();

router.post('/addtocart', controller.addToCart);
router.post('/getcart', controller.getCart);
router.post('/removefromcart', controller.removeFromCart);
router.post('/updatecartquantity', controller.updateCartQuantity);
router.post('/addorder', controller.addOrder);
router.post('/getorderlist', controller.getOrderList);

export default router;
