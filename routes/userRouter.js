import express from 'express';
import controller from '../controllers/userController.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/login', function (req, res, next) {
	passport.authenticate('login', function (err, user, info) {
		if (err || !user) {
			const error = new Error('An error occurred.');
			return next(error);
		}
		req.login(user, { session: false }, async (error) => {
			if (error) return next(error);

			const body = { userId: user.userId, email: user.email };
			const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

			return res.json({ token });
		});
	})(req, res, next);
});

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.json({ success: true });
	});
});

router.post('/signup', controller.signup);

export default router;
