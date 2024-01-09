import db from '../config/firebase.js';
import { collection, query, getDoc, getDocs, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Customer, customerConverter } from '../models/customer.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
const controller = {};

controller.login = (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({ message: info.message });
		}
		req.login(user, { session: false }, async (error) => {
			if (error) return next(error);

			const body = { userId: user.userId, role: user.role };
			const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

			return res.json({ token });
		});
	})(req, res, next);
};

controller.loginFB = (req, res, next) => {
	passport.authenticate('facebook', (err, user, info) => {
		if (err) {
			return next(err);
		}
		req.login(user, { session: false }, async (error) => {
			if (error) return next(error);

			const body = { userId: user.userId, role: user.role };
			const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

			res.cookie('token', token, {
				secure: false, // if true only transmit cookie over https
				httpOnly: true, // prevent client side JS from reading the cookie
			});

			return res.redirect('http://localhost:3000/login');
		});
	})(req, res, next);
};

controller.loginGG = (req, res, next) => {
	passport.authenticate('google', (err, user, info) => {
		if (err) {
			return next(err);
		}
		req.login(user, { session: false }, async (error) => {
			if (error) return next(error);

			const body = { userId: user.userId, role: user.role };
			const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

			res.cookie('token', token, {
				secure: false, // if true only transmit cookie over https
				httpOnly: true, // prevent client side JS from reading the cookie
			});

			return res.redirect('http://localhost:3000/login');
		});
	})(req, res, next);
};

controller.logout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.clearCookie('token');
		res.json({ success: true });
	});
};

controller.signup = async (req, res) => {
	try {
		let { username, email, password } = req.body;
		let snapshot1 = await getDocs(query(collection(db, 'customers'), where('username', '==', username)));
		let snapshot2 = await getDocs(query(collection(db, 'customers'), where('email', '==', email)));
		if (snapshot1.empty || snapshot2.empty) {
			let ref = collection(db, 'customers').withConverter(customerConverter);
			let user = new Customer(username, password, email);

			const docRef = await addDoc(ref, user);
			await updateDoc(docRef, { userId: docRef.id });
			user = (await getDoc(docRef)).data();

			const body = { userId: user.userId, role: 'customer' };
			const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

			return res.json({ success: true, token });
		} else {
			return res.json({ success: false, message: '(*) User already exist!' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: error.message });
	}
};

controller.auth = (req, res) => {
	res.json({ role: req.user.role });
};

controller.token = (req, res) => {
	res.json({ token: req.cookies.token });
};

controller.customers = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'customers')));
	if (!snapshot.empty) {
		let customers = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, customers });
	} else {
		res.json({ success: false });
	}
};

controller.merchants = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'merchants')));
	if (!snapshot.empty) {
		let merchants = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, merchants });
	} else {
		res.json({ success: false });
	}
};

controller.products = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'products')));
	if (!snapshot.empty) {
		let products = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, products });
	} else {
		res.json({ success: false });
	}
};

controller.product = async (req, res) => {
	let { productId } = req.body;
	let snapshot = await getDoc(doc(db, 'products', productId));
	if (!snapshot.empty) {
		let product = snapshot.data();
		res.json({ success: true, product });
	}
};

controller.shoppings = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'shoppings')));
	if (!snapshot.empty) {
		let shoppings = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, shoppings });
	} else {
		res.json({ success: false });
	}
};

controller.shopping = async (req, res) => {
	let { shoppingId } = req.body;
	let snapshot = await getDoc(doc(db, 'shoppings', shoppingId));
	if (!snapshot.empty) {
		let shopping = snapshot.data();
		res.json({ success: true, shopping });
	}
};

controller.updatePassword = async (req, res) => {
	try {
		const { userId, newPassword } = req.query;
		console.log(userId);
		const userRef = doc(db, 'customers', userId);
		let user = await getDoc(userRef);
		if (user.empty) {
			userRef = doc(db, 'merchants', userId);
			user = await getDoc(userRef);
		}
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		await updateDoc(userRef, { password: bcrypt.hashSync(newPassword, salt) });
		res.redirect('http://localhost:3000/login');
	} catch (error) {
		console.error('Error:', error);
		res.json({ success: false });
	}
};

controller.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		let role;
		let snapshot = await getDocs(query(collection(db, 'customers'), where('email', '==', email)));
		if (snapshot.empty) {
			snapshot = await getDocs(query(collection(db, 'merchants'), where('email', '==', email)));
			if (snapshot.empty) {
				console.log('User not found.');
			}
			role = 'merchant';
		} else {
			role = 'customer';
		}

		let user = snapshot.docs[0].data();
		console.log(user);

		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let newPassword = Array(6)
			.fill('')
			.map(() => characters[Math.floor(Math.random() * characters.length)])
			.join('');

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'phamtrantuantu27@gmail.com',
				pass: 'qtpj mula vpkz gftg',
			},
		});

		const mailOptions = {
			from: 'phamtrantuantu27@gmail.com',
			to: email,
			subject: 'Request for Password Reset',
			html: `
				<html>
				<head>
					<title>Password Reset</title>
				</head>
				<body>
					<p>Hi ${user.username},</p>
				
					<p>You recently requested to reset your password for your account. Here is your new password:</p>
				
					<p><strong>${newPassword}</strong></p>
				
					<p>Click the button below to confirm the password reset:</p>
				
					<button style="margin-top: 15px;padding: 10px;color: white;background-color: #4CAF50;border: none;border-radius: 5px;cursor: pointer;">
						<a href="http://localhost:4000/updatepassword?userId=${user.userId}&newPassword=${newPassword}" style="text-decoration: none;color: white;">
							Reset Password
						</a>
					</button>
				
					<p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.</p>
				
					<p>Thanks,</p>
					<p>BruteWardrobe</p>
				</body>
				</html>
				`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			res.json({ success: true });
		});
	} catch (error) {
		console.error(error);
	}
};

export default controller;
