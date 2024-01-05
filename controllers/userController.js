import db from '../config/firebase.js';
import { collection, query, getDoc, getDocs, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Customer, customerConverter } from '../models/customer.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
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

			return res.json({ token });
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
	}
};

controller.customer = async (req, res) => {
	let { customerId } = req.body;
	let snapshot = await getDoc(doc(db, 'customers', customerId));
	if (!snapshot.empty) {
		let customer = snapshot.data();
		res.json({ success: true, customer });
	}
};


controller.products = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'products')));
	if (!snapshot.empty) {
		let products = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, products });
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
		// shoppings.forEach((shopping) => {
		// 	shopping.orderList.forEach((ord) => {
		// 		if (ord.dateCreated)
		// 			ord.dateCreated = new Date(ord.dateCreated);
		// 		if (ord.dateShipped && ord.dateShipped != 'none')
		// 			ord.dateShipped = new Date(ord.dateShipped);
		// 	})
		// })
		res.json({ success: true, shoppings });
	}
};

controller.shopping = async (req, res) => {
	let { shoppingId } = req.body;
	let snapshot = await getDoc(doc(db, 'shoppings', shoppingId));
	if (!snapshot.empty) {
		let shopping = snapshot.data();
		// shopping.orderList.forEach((ord) => {
		// 	if (ord.dateCreated)
		// 		ord.dateCreated = new Date(ord.dateCreated);
		// 	if (ord.dateShipped && ord.dateShipped != 'none')
		// 		ord.dateShipped = new Date(ord.dateShipped);
		// })
		res.json({ success: true, shopping });
	}
};

export default controller;
