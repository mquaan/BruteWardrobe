import db from '../config/firebase.js';
import { collection, addDoc, getDoc, getDocs, query, deleteDoc, doc, updateDoc, where } from 'firebase/firestore';
import { Merchant, merchantConverter } from '../models/merchant.js';
import { Sale, saleConverter } from '../models/sale.js';

const controller = {};

controller.signupMerchant = async (req, res) => {
	try {
		let { username, password, salary } = req.body;
		let snapshot1 = await getDocs(query(collection(db, 'merchants'), where('username', '==', username)));
		if (snapshot1.empty) {
			let ref = collection(db, 'merchants').withConverter(merchantConverter);
			let user = new Merchant(username, password, salary);
			if (typeof user.salary === 'string') {
				user.salary = Number(user.salary);
			}
			const docRef = await addDoc(ref, user);
			await updateDoc(docRef, { userId: docRef.id });

			return res.json({ success: true, message: 'Created account successfully.' });
		} else {
			return res.json({ success: false, message: '(*) Username already exist!' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: error.message });
	}
};

controller.removeUser = async (req, res) => {
	let { userId, role } = req.body;
	let userRef;
	if (role == 'customer') {
		userRef = doc(db, 'customers', userId);
	}
	else {
		userRef = doc(db, 'merchants', userId);
	}
	let snapshot = await getDoc(userRef);
	if (snapshot.exists) {
		await deleteDoc(userRef);
		res.json({ success: true, message: 'Deleted user successfully' });
	}
	else {
		res.json({ success: false, message: 'Not existed userId' });
	}
	return res;
}

controller.ban_unban_User = async (req, res) => {
	let { userId, role } = req.body;
	let userRef;
	if (role == 'customer') {
		userRef = doc(db, 'customers', userId);
	}
	else {
		userRef = doc(db, 'merchants', userId);
	}
	let snapshot = await getDoc(userRef);
	if (snapshot.exists) {
		let t_user = snapshot.data();
		if (typeof t_user === 'undefined') {
			t_user.banned = true;
		}
		else {
			t_user.banned = !t_user.banned;
		}
		await updateDoc(userRef, t_user);

		res.json({ success: true });
	}
	else {
		res.json({ success: false, message: 'Not existed userId' });
	}
	return res;
}

controller.getSales = async (req, res) => {
	let snapshot = await getDocs(query(collection(db, 'sales')));
	if (!snapshot.empty) {
		let sales = snapshot.docs.map((doc) => doc.data());
		res.json({ success: true, sales });
	}
	else {
		res.json({ success: false })
	}
	return res;
}

controller.addSale = async (req, res) => {
	let { userId, cart, money, time } = req.body;
	console.log(req.body);
	try {
		const ref = collection(db, 'sales').withConverter(saleConverter);
		const sale = new Sale(userId, cart, money, time);
		const docRef = await addDoc(ref, sale);
		res.json({ success: true });
	} catch (error) {
		console.log(error);
	}
};

controller.getAccountNumber = async (req, res) => {
	try {
		let snapshotAdmin = await getDocs(collection(db, 'admins'));
		let snapshotMerchant = await getDocs(collection(db, 'merchants'));
		let snapshotCustomer = await getDocs(collection(db, 'customers'));
		res.json({ success: true, accountNum: [snapshotAdmin.size, snapshotMerchant.size, snapshotCustomer.size] });
	} catch (error) {
		console.log(error);
	}
};

controller.getTotalRevenue = async (req, res) => {
	try {
		let snapshotSale = await getDocs(collection(db, 'sales'));
		const sales = snapshotSale.docs.map((doc) => doc.data());
		res.json({ success: true, totalRevenue: sales.reduce((total, sale) => total + sale.money, 0) });
	} catch (error) {
		console.log(error);
	}
};

controller.countCustomers = async (req, res) => {
	try {
		let snapshotCustomer = await getDocs(collection(db, 'customers'));
		const customers = snapshotCustomer.docs.map((doc) => doc.data());

		let customerCounts = customers.reduce((acc, customer) => {
			let dateCreated = customer.dateCreated.split('T')[0];
			acc[dateCreated] = acc[dateCreated] ? acc[dateCreated] + 1 : 1;
			return acc;
		}, {});

		let currentDate = new Date();

		let duration = Array.from({ length: 15 }, (v, i) => {
			let date = new Date(currentDate - i * 24 * 60 * 60 * 1000);
			return date.toISOString().split('T')[0];
		});

		customerCounts = duration.map((date) => [date, customerCounts[date] || 0]);
		customerCounts = customerCounts.reverse();

		res.json({ success: true, customerCounts });
	} catch (error) {
		console.log(error);
	}
};

controller.countSales = async (req, res) => {
	try {
		let snapshotCustomer = await getDocs(collection(db, 'sales'));
		const sales = snapshotCustomer.docs.map((doc) => doc.data());

		let saleCounts = sales.reduce((acc, sale) => {
			let time = sale.time.split('T')[0];
			acc[time] = acc[time] ? acc[time] + sale.money : sale.money;
			return acc;
		}, {});

		let currentDate = new Date();

		let duration = Array.from({ length: 15 }, (v, i) => {
			let date = new Date(currentDate - i * 24 * 60 * 60 * 1000);
			return date.toISOString().split('T')[0];
		});

		saleCounts = duration.map((date) => [date, saleCounts[date] || 0]);
		saleCounts = saleCounts.reverse();

		res.json({ success: true, saleCounts });
	} catch (error) {
		console.log(error);
	}
};

export default controller;
