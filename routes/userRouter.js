import express from 'express';
import passport from 'passport';
import User from '../models/user.js';
import LocalStrategy from 'passport-local';
import db from '../config/firebase.js';
import controller from '../controllers/userController.js';
import bcrypt from 'bcrypt';
import { collection, query, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		async function (username, password, cb) {
			try {
				let snapshot1 = await getDocs(query(collection(db, 'customers'), where('username', '==', username)));
				let snapshot2 = await getDocs(query(collection(db, 'customers'), where('email', '==', username)));
				if (snapshot1.empty && snapshot2.empty) {
					snapshot1 = await getDocs(query(collection(db, 'merchants'), where('username', '==', username)));
					snapshot2 = await getDocs(query(collection(db, 'merchants'), where('email', '==', username)));
					if (snapshot1.empty && snapshot2.empty) {
						console.log('No such user found.');
						return cb(null, false, {
							message: '(*) No such user found.',
						});
					}
				}

				let user = !snapshot1.empty ? snapshot1.docs[0].data() : snapshot2.docs[0].data();
				console.log(user);

				const passwordMatch = await bcrypt.compare(password, user.password);

				if (!passwordMatch) {
					console.log('Incorrect username/email or password.');
					return cb(null, false, { message: '(*) Incorrect username/email or password.' });
				}

				console.log('Validation passed');
				return cb(null, user);
			} catch (err) {
				console.error(err);
				return cb(err);
			}
		}
	)
);

const router = express.Router();

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

router.get('/', controller.show);
router.post('/login/password', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({ success: false, message: info.message });
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({ success: true, user: user });
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
