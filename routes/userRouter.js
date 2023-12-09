import express from "express";
import controller from "../controllers/userController.js"

const router = express.Router();

router.get('/', controller.show);
router.post('/signin', controller.login);
router.post('/signup', controller.signup);

export default router; 