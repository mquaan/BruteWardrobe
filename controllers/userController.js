import db from '../config/firebase.js';
import { collection, query, getDoc, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';
import { Customer, customerConverter } from '../models/customer.js';
import bcrypt from 'bcrypt'
const controller = {};

controller.signup = async (req, res) => {
	try {
		let { username, email, password } = req.body;
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		password = bcrypt.hashSync(password, salt);
		let snapshot1 = await getDocs(query(collection(db, 'customers'), where('username', '==', username)));
		let snapshot2 = await getDocs(query(collection(db, 'customers'), where('email', '==', email)));
		if (snapshot1.empty || snapshot2.empty) {
			let ref = collection(db, 'customers').withConverter(customerConverter);
			let user = new Customer(username, password, email);

			const docRef = await addDoc(ref, user);
			await updateDoc(docRef, { userId: docRef.id });
			user = (await getDoc(docRef)).data();

			return res.json({ success: true, user});
		} else {
			return res.json({ success: false, message: '(*) User already exist!' });
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, message: error.message });
	}
};

export default controller;
