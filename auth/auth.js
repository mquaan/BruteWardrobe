import db from '../config/firebase.js';
import { Customer, customerConverter } from '../models/customer.js';
import { collection, query, getDoc, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';
import facebookStrategy from 'passport-facebook';
import googleStrategy from 'passport-google-oauth20';

const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

dotenv.config();

passport.use(
	'jwt',
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
				let role;
				let snapshot1 = await getDocs(query(collection(db, 'customers'), where('username', '==', username)));
				let snapshot2 = await getDocs(query(collection(db, 'customers'), where('email', '==', username)));
				if (snapshot1.empty && snapshot2.empty) {
					snapshot1 = await getDocs(query(collection(db, 'merchants'), where('username', '==', username)));
					snapshot2 = await getDocs(query(collection(db, 'merchants'), where('email', '==', username)));
					if (snapshot1.empty && snapshot2.empty) {
						snapshot1 = await getDocs(query(collection(db, 'admins'), where('username', '==', username)));
						snapshot2 = await getDocs(query(collection(db, 'admins'), where('email', '==', username)));
						if (snapshot1.empty && snapshot2.empty) {
							console.log('User not found.');
							return cb(null, false, {
								message: '(*) User not found!',
							});
						}
						role = 'admin';
					} else {
						role = 'merchant';
					}
				} else {
					role = 'customer';
				}

				let user = !snapshot1.empty ? snapshot1.docs[0].data() : snapshot2.docs[0].data();

				const passwordMatch = await bcrypt.compare(password, user.password);

				if (!passwordMatch) {
					console.log('Incorrect password.');
					return cb(null, false, { message: '(*) Incorrect password!' });
				}

				console.log('Validation passed');
				user.role = role;
				return cb(null, user);
			} catch (err) {
				console.error(err);
				return cb(err);
			}
		}
	)
);

passport.use(
	new facebookStrategy(
		{
			clientID: '1853700235086660',
			clientSecret: '0457bdd700994322dde417d8f3640d6e',
			callbackURL: '/auth/facebook/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const facebookId = profile.id;
				let snapshot = await getDocs(query(collection(db, 'customers'), where('facebookId', '==', facebookId)));
				if (!snapshot.empty) {
					let user = snapshot.docs[0].data();
					user.role = 'customer';
					return done(null, user);
				}
				let ref = collection(db, 'customers').withConverter(customerConverter);
				let user = new Customer(profile.displayName, null, null, facebookId);

				const docRef = await addDoc(ref, user);
				await updateDoc(docRef, { userId: docRef.id });
				user = (await getDoc(docRef)).data();

				user.role = 'customer';
				return done(null, user);
			} catch (err) {
				console.error(err);
				return done(err);
			}
		}
	)
);

passport.use(
	new googleStrategy(
		{
			clientID: '507511764617-n3272lahhf66j7bgpp3es2s5ei6uau7c.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile._json.email;
				let snapshot = await getDocs(query(collection(db, 'customers'), where('email', '==', email)));
				if (!snapshot.empty) {
					let user = snapshot.docs[0].data();
					user.role = 'customer';
					return done(null, user);
				}
				let ref = collection(db, 'customers').withConverter(customerConverter);
				let user = new Customer(profile.displayName, null, email);

				const docRef = await addDoc(ref, user);
				await updateDoc(docRef, { userId: docRef.id });
				user = (await getDoc(docRef)).data();

				user.role = 'customer';
				return done(null, user);
			} catch (err) {
				console.error(err);
				return done(err);
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
