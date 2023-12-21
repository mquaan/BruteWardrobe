import db from '../config/firebase.js';
import { collection, query, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';
import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, merchantConverter } from '../models/merchant.js';
const controller = {};

controller.signup = async (req, res) => {
	console.log(req.body);
	try {
		let { username, email, password } = req.body;
		let ref = collection(db, 'customers');
		let q1 = query(ref, where('username', '==', username));
		let q2 = query(ref, where('email', '==', email));

		if (!getDocs(q1).empty && !getDocs(q2).empty) {
            let reff = collection(db, role).withConverter(customerConverter);
			let user = new Customer(username, password, email);

			const docRef = await addDoc(reff, user);
			await updateDoc(docRef, { userId: docRef.id });

			return res.json({ success: true, user: docRef });
		} else {
			return res.status(409).send('User already exist');
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export default controller;
