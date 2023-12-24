import db from '../config/firebase.js';
import { Product, productConverter } from '../models/product.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

const controller = {};

controller.editProductList = async (req, res) => {
	let { product } = req.body;
	if (product.productId) {
		let productRef = doc(db, 'products', product.productId);
		await updateDoc(productRef, product);
		res.json({ success: true });
	} else {
		let ref = collection(db, 'products').withConverter(productConverter);
		const docRef = await addDoc(ref, product);
		await updateDoc(docRef, { productId: docRef.id });
		res.json({ success: true });
	}
};

export default controller;
