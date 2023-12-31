import express from 'express';
import controller from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.post('/signup', controller.signup);
router.get('/auth', passport.authenticate('jwt', { session: false }), controller.auth);
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/facebook/callback', controller.loginFB);
router.get('/auth/google/callback', controller.loginGG);
router.get('/token', controller.token);
router.get('/customers', controller.customers);
router.get('/merchants', controller.merchants);
router.get('/products', controller.products);
router.post('/product', controller.product);
router.get('/shoppings', controller.shoppings);
router.post('/shopping', controller.shopping);
router.post('/forgotpassword', controller.forgotPassword);
router.get('/updatepassword', controller.updatePassword);


export default router;
