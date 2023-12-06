import express from "express";
import controller from "../controllers/customerController.js"

const router = express.Router();

router.get('/', controller.read);

export default router; 