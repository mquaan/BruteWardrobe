import db from '../config/firebase.js';
import { Product, productConverter } from '../models/product.js';
import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { cloudinary } from '../cloudinary/index.js';

const controller = {};

controller.getMerchant = async (req, res) => {
	let { userId } = req.query;
	let snapshot = await getDoc(doc(db, 'merchants', userId));
	if (!snapshot.empty) {
		let merchant = snapshot.data();
		res.json({ success: true, merchant: merchant });
	}
    else {
        res.json({success: false})
    }
};

controller.updateInfo = async (req, res) => {
	try {
		const { userId, userInfo } = req.body;
		const userRef = doc(db, 'merchants', userId);

		// Update the user info in the Firestore database
		await updateDoc(userRef, userInfo);
		res.json({ success: true });
	} catch (error) {
		console.error('Error:', error);
		res.json({ success: false });
	}
};

controller.editProductList = async (req, res) => {
    let { userId, product } = req.body;
    product.last_updated_by = userId;
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

controller.editOrderStatus = async (req, res) => {
    let { userId, shoppingId, orderId, newStatus, newdateShipped } = req.body;
    
    let shoppingRef = doc(db, 'shoppings', shoppingId);

    // Get the shopping document
    let shoppingSnap = await getDoc(shoppingRef);
    if (!shoppingSnap.exists()) {
        // Handle the error
        console.error('No such document!');
        res.json({ success: false });
        return;
    } else {
        // Get the shopping data
        let shoppingData = shoppingSnap.data();

        // Find the index of the order with the given orderId
        let orderIndex = shoppingData.orderList.findIndex(order => order.orderId === orderId);

        if (orderIndex !== -1) {
            shoppingData.orderList[orderIndex].last_updated_by = userId;
            shoppingData.orderList[orderIndex].orderStatus = newStatus;
            shoppingData.orderList[orderIndex].dateShipped = newdateShipped;
            await updateDoc(shoppingRef, { orderList: shoppingData.orderList });
        } else {
            // Handle the error
            res.json({ success: false });
            console.error('No such order!');
        }
        res.json({ success: true });
    }

}

controller.cancelOrder = async (req, res) => {
    let { shoppingId, orderId } = req.body;

    let shoppingRef = doc(db, 'shoppings', shoppingId);

    // Get the shopping document
    let shoppingSnap = await getDoc(shoppingRef);
    if (!shoppingSnap.exists()) {
        // Handle the error
        console.error('No such document!');
        res.json({ success: false });
        return;
    } else {
        // Get the shopping data
        let shoppingData = shoppingSnap.data();

        // Find the index of the order with the given orderId
        let orderIndex = shoppingData.orderList.findIndex(order => order.orderId === orderId);

        if (orderIndex !== -1) {
            // update order ID
            shoppingData.orderList.splice(orderIndex, 1);
            // reorder orderId
            shoppingData.orderList.forEach((ord, ind) => {ord.orderId = ind})
            await updateDoc(shoppingRef, { orderList: shoppingData.orderList });
        } else {
            // Handle the error
            res.json({ success: false });
            console.error('No such order!');
        }
        res.json({ success: true });
    }
}

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
