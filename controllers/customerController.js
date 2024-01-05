import db from '../config/firebase.js';
import { Shopping, shoppingConverter } from '../models/shopping.js';
import { Customer, customerConverter } from '../models/customer.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

const controller = {};

controller.addToCart = async (req, res) => {
	let { userId, productId, quantity, size } = req.body;
	let userRef = doc(db, 'customers', userId);
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (!shoppingId) {
			let ref = collection(db, 'shoppings').withConverter(shoppingConverter);
			let shopping = new Shopping();
			const docRef = await addDoc(ref, shopping);
			await updateDoc(docRef, { shoppingId: docRef.id, cart: [{ productId, quantity, size }] });
			shoppingId = docRef.id;
		} else {
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shoppingRef = doc(db, 'shoppings', shoppingId);
				let shopping = shoppingSnapshot.data();
				let cartItemIndex = shopping.cart.findIndex((item) => {
					return item.productId == productId && item.size == size;
				});

				if (cartItemIndex !== -1) {
					shopping.cart[cartItemIndex].quantity += quantity;
				} else {
					shopping.cart.push({ productId, quantity, size });
				}
				await updateDoc(shoppingRef, { cart: shopping.cart });
			}
		}
		await updateDoc(userRef, { shoppingId: shoppingId });
	}
};

controller.getCart = async (req, res) => {
	let { userId } = req.body;
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (!shoppingId) {
			res.json({ succuss: false });
		} else {
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shopping = shoppingSnapshot.data();
				let products = [];
				for (let cartItem of shopping.cart) {
					let productSnapshot = await getDoc(doc(db, 'products', cartItem.productId));
					if (productSnapshot.exists) {
						products.push({ ...productSnapshot.data(), quantity: cartItem.quantity, size: cartItem.size });
					}
				}
				res.json({ success: true, cart: products });
			}
		}
	}
};

controller.removeFromCart = async (req, res) => {
	let { userId, productId, size } = req.body;
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (!shoppingId) {
			res.json({ success: false });
		} else {
			let shoppingRef = doc(db, 'shoppings', shoppingId);
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shopping = shoppingSnapshot.data();
				shopping.cart = shopping.cart.filter((item) => item.productId !== productId || item.size !== size);
				await updateDoc(shoppingRef, { cart: shopping.cart });
				res.json({ success: true });
			}
		}
	}
};

controller.updateCartQuantity = async (req, res) => {
	let { userId, productId, quantity, size } = req.body;
	let userRef = doc(db, 'customers', userId);
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (!shoppingId) {
			let ref = collection(db, 'shoppings').withConverter(shoppingConverter);
			let shopping = new Shopping();
			const docRef = await addDoc(ref, shopping);
			await updateDoc(docRef, { shoppingId: docRef.id, cart: [{ productId, quantity, size }] });
			shoppingId = docRef.id;
		} else {
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shoppingRef = doc(db, 'shoppings', shoppingId);
				let shopping = shoppingSnapshot.data();
				let cartItemIndex = shopping.cart.findIndex((item) => {
					return item.productId == productId && item.size == size;
				});

				if (cartItemIndex !== -1) {
					shopping.cart[cartItemIndex].quantity = quantity;
				} else {
					shopping.cart.push({ productId, quantity, size });
				}
				await updateDoc(shoppingRef, { cart: shopping.cart });
			}
		}
		await updateDoc(userRef, { shoppingId: shoppingId });
		res.json({ success: true });
	}
};

controller.addOrder = async (req, res) => {
	let { userId, cart, deliveryInfo } = req.body;
	console.log(req.body);
	let userRef = doc(db, 'customers', userId);
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (!shoppingId) {
			let ref = collection(db, 'shoppings').withConverter(shoppingConverter);
			let shopping = new Shopping();
			const docRef = await addDoc(ref, shopping);
			await updateDoc(docRef, {
				shoppingId: docRef.id,
				orderList: [
					{
						cart,
						dateCreated: new Date(),
						dateShipped: null,
						deliverInfo: deliveryInfo.fullName + ' - ' + deliveryInfo.address + ' - ' + deliveryInfo.phoneNumber,
						orderStatus: 'Processing',
						paymentInfo: deliveryInfo.paymentMethod,
					},
				],
			});
			shoppingId = docRef.id;
		} else {
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shoppingRef = doc(db, 'shoppings', shoppingId);
				let shopping = shoppingSnapshot.data();
				shopping.orderList.push({
					cart,
					dateCreated: new Date(),
					dateShipped: null,
					deliverInfo: deliveryInfo.fullName + ' - ' + deliveryInfo.address + ' - ' + deliveryInfo.phoneNumber,
					orderStatus: 'Processing',
					paymentInfo: deliveryInfo.paymentMethod,
				});
				await updateDoc(shoppingRef, { orderList: shopping.orderList });
				await updateDoc(shoppingRef, { cart: [] });
			}
			await updateDoc(userRef, { shoppingId: shoppingId });
		}
	}
};

export default controller;
