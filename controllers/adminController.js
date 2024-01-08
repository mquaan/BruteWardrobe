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

export default controller;
