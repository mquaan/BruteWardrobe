import express from "express";
import controller from "../controllers/customerController.js"

const router = express.Router();

router.post('/addtocart', controller.addToCart);
router.post('/getcart', controller.getCart);

export default router; 