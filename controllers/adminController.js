import db from '../config/firebase.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import jwt from 'jsonwebtoken';

const controller = {};

controller.signupMerchant = async (req, res) => {
	try {
		let { username, salary, password } = req.body;
		let snapshot1 = await getDocs(query(collection(db, 'merchants'), where('username', '==', username)));
		if (snapshot1.empty) {
			let ref = collection(db, 'merchants').withConverter(customerConverter);
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