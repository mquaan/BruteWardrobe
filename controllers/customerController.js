import db from '../config/firebase.js';
import { Shopping, shoppingConverter } from '../models/shopping.js';
import { Customer, customerConverter } from '../models/customer.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import crypto from 'crypto';
import https from 'https';

async function totalCart(userId) {
	let total = 0;
	let userSnapshot = await getDoc(doc(db, 'customers', userId));

	if (!userSnapshot.exists) {
		console.log('No user found!');
	} else {
		let user = userSnapshot.data();
		let shoppingId = user.shoppingId;
		if (shoppingId) {
			let shoppingSnapshot = await getDoc(doc(db, 'shoppings', shoppingId));
			if (!shoppingSnapshot.exists) {
				console.log('No shopping document found!');
			} else {
				let shopping = shoppingSnapshot.data();
				for (let cartItem of shopping.cart) {
					let productSnapshot = await getDoc(doc(db, 'products', cartItem.productId));
					if (productSnapshot.exists) {
						total += productSnapshot.data().price * cartItem.quantity;
					}
				}
			}
		}
	}
	return total;
}

const controller = {};

controller.getCustomer = async (req, res) => {
	let { userId } = req.query;
	let snapshot = await getDoc(doc(db, 'customers', userId));
	if (!snapshot.empty) {
		let customer = snapshot.data();
		res.json({ success: true, customer: customer });
	}
	else {
        res.json({success: false})
    }
};

controller.updateInfo = async (req, res) => {
	try {
		const { userId, userInfo } = req.body;
		const userRef = doc(db, 'customers', userId);

		// Update the user info in the Firestore database
		await updateDoc(userRef, userInfo);
		res.json({ success: true });
	} catch (error) {
		console.error('Error:', error);
		res.json({ success: false });
	}
};

controller.changePassword = async (req, res) => {
	try {
        const { userId, oldPassword, newPassword } = req.body;
        const userRef = doc(db, 'customers', userId);
		let userSnapshot = await getDoc(doc(db, 'customers', userId));
		if (!userSnapshot.exists) {
			console.log('No user found!');
		}
		else {
			await updateDoc(userRef, userInfo);
			res.json({ success: true });
		}
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
}

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
						dateCreated: new Date().toISOString(),
						dateShipped: null,
						deliverInfo: deliveryInfo.fullName + ' - ' + deliveryInfo.address + ' - ' + deliveryInfo.phoneNumber,
						orderStatus: 'Processing',
						paymentInfo: deliveryInfo.paymentMethod,
						orderId: 1,
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
					dateCreated: new Date().toISOString(),
					dateShipped: null,
					deliverInfo: deliveryInfo.fullName + ' - ' + deliveryInfo.address + ' - ' + deliveryInfo.phoneNumber,
					orderStatus: 'Processing',
					paymentInfo: deliveryInfo.paymentMethod,
					orderId: shopping.orderList.length,
				});
				await updateDoc(shoppingRef, { orderList: shopping.orderList });
				await updateDoc(shoppingRef, { cart: [] });
			}
			await updateDoc(userRef, { shoppingId: shoppingId });
		}
	}
};

controller.getOrder = async (req, res) => {
	let { userId } = req.body;
	let { orderIndex } = req.body;
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
				for (let product of shopping.cart[orderIndex]) {
					let productSnapshot = await getDoc(doc(db, 'products', product.productId));
					if (productSnapshot.exists) {
						products.push({ ...productSnapshot.data(), quantity: product.quantity, size: product.size });
					}
				}
				res.json({ success: true, cart: products });
			}
		}
	}
};

controller.getOrderList = async (req, res) => {
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
				res.json({ success: true, orderList: shopping.orderList });
			}
		}
	}
};

controller.payment = async (request, response) => {
	var userId = request.body.userId;
	var deliveryInfo = request.body.deliveryInfo;
	var partnerCode = 'MOMO';
	var accessKey = 'F8BBA842ECF85';
	var secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
	var requestId = partnerCode + new Date().getTime();
	var orderId = requestId;
	var orderInfo = 'pay with MoMo';
	var redirectUrl = 'http://localhost:4000/customer/handlepayment';
	var ipnUrl = 'https://callback.url/notify';
	// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
	var amount = await totalCart(userId);
	amount = amount.toString();
	console.log(amount);
	var requestType = 'captureWallet';
	var extraData = userId + '---' + deliveryInfo.fullName + ' - ' + deliveryInfo.address + ' - ' + deliveryInfo.phoneNumber + '---' + deliveryInfo.paymentMethod; //pass empty value if your merchant does not have stores

	var rawSignature =
		'accessKey=' +
		accessKey +
		'&amount=' +
		amount +
		'&extraData=' +
		extraData +
		'&ipnUrl=' +
		ipnUrl +
		'&orderId=' +
		orderId +
		'&orderInfo=' +
		orderInfo +
		'&partnerCode=' +
		partnerCode +
		'&redirectUrl=' +
		redirectUrl +
		'&requestId=' +
		requestId +
		'&requestType=' +
		requestType;
	//puts raw signature
	console.log('--------------------RAW SIGNATURE----------------');
	console.log(rawSignature);
	//signature
	var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');
	console.log('--------------------SIGNATURE----------------');
	console.log(signature);

	//json object send to MoMo endpoint
	const requestBody = JSON.stringify({
		partnerCode: partnerCode,
		accessKey: accessKey,
		requestId: requestId,
		amount: amount,
		orderId: orderId,
		orderInfo: orderInfo,
		redirectUrl: redirectUrl,
		ipnUrl: ipnUrl,
		extraData: extraData,
		requestType: requestType,
		signature: signature,
		lang: 'en',
	});
	//Create the HTTPS objects
	const options = {
		hostname: 'test-payment.momo.vn',
		port: 443,
		path: '/v2/gateway/api/create',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(requestBody),
		},
	};
	//Send the request and get the response
	const req = https.request(options, (res) => {
		res.setEncoding('utf8');
		let body = '';
		res.on('data', (chunk) => {
			body += chunk;
		});
		res.on('end', () => {
			const paymentResponse = JSON.parse(body);
			console.log(paymentResponse);
			if (paymentResponse && paymentResponse.resultCode == 0) {
				// Payment was successful, send the payment URL
				response.json({ success: true, payUrl: paymentResponse.payUrl });
			} else {
				// Payment failed, respond with an error
				response.json({ error: 'Payment failed' });
			}
		});
	});
	// write data to request body
	console.log('Sending....');
	req.write(requestBody);
	req.end();
};

controller.handlePayment = async (req, res) => {
	console.log(req.query);
	if (req.query.resultCode == 0) {
		let [userId, deliveryInfo, paymentMethod] = req.query.extraData.split('---');
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
							cart: shopping.cart,
							dateCreated: new Date().toISOString(),
							dateShipped: null,
							deliverInfo: deliveryInfo,
							orderStatus: 'Processing',
							paymentInfo: paymentMethod,
							orderId: 1,
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
						cart: shopping.cart,
						dateCreated: new Date().toISOString(),
						dateShipped: null,
						deliverInfo: deliveryInfo,
						orderStatus: 'Processing',
						paymentInfo: paymentMethod,
						orderId: shopping.orderList.length,
					});
					await updateDoc(shoppingRef, { orderList: shopping.orderList });
					await updateDoc(shoppingRef, { cart: [] });
				}
				await updateDoc(userRef, { shoppingId: shoppingId });
			}
		}
		res.redirect('http://localhost:3000/order-status');
	} else { 
		res.json({ success: false });
	}
};

export default controller;
