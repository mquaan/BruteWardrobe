import express from 'express';
import controller from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/signup', controller.signup);
router.get('/auth', passport.authenticate('jwt', { session: false }), controller.auth);
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/facebook/callback', controller.loginFB);

router.get('/auth/google/callback', controller.loginGG);

export default router;
