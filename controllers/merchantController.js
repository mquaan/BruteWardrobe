import db from '../config/firebase.js';
import { Product, productConverter } from '../models/product.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { cloudinary } from '../cloudinary/index.js';

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

controller.removeProduct = async (req, res) => {
	let { product } = req.body;
	if (product.productId) {
		for (let i = 0; i < product.imgURLs.length; i++) {
			const publicId = 'BruteWardrobe/' + product.imgURLs[i].split('/').slice(-1)[0].split('.')[0];
			console.log(publicId)
			cloudinary.uploader
				.destroy(publicId, function (error, result) {
					console.log(result, error);
				})
				.then((resp) => console.log(resp))
				.catch((_err) => console.log('Something went wrong, please try again later.'));
		}
		let productRef = doc(db, 'products', product.productId);
		await deleteDoc(productRef, product);
		res.json({ success: true });
	}
};

export default controller;
