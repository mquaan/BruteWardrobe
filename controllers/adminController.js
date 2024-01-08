import db from '../config/firebase.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { Merchant, merchantConverter } from '../models/merchant.js';

const controller = {};

controller.signupMerchant = async (req, res) => {
	try {
		let { username, salary, password } = req.body;
		let snapshot1 = await getDocs(query(collection(db, 'merchants'), where('username', '==', username)));
		if (snapshot1.empty) {
			let ref = collection(db, 'merchants').withConverter(merchantConverter);
			let user = new Merchant(username, password, salary);

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

export default controller;