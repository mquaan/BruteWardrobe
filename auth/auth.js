import db from '../config/firebase.js';
import { collection, query, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';

const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

dotenv.config();

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.TOKEN_SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	'login',
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
						console.log('User not found.');
						return cb(null, false, {
							message: '(*) User not found!',
						});
					}
				}

				let user = !snapshot1.empty ? snapshot1.docs[0].data() : snapshot2.docs[0].data();
				console.log(user);

				const passwordMatch = await bcrypt.compare(password, user.password);

				if (!passwordMatch) {
					console.log('Incorrect password.');
					return cb(null, false, { message: '(*) Incorrect password!' });
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

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
