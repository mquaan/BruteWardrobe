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

controller.editOrderStatus = async (req, res) => {
    let { shoppingId, orderId, newStatus, newdateShipped } = req.body;
    if (shoppingId) {
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
}


export default controller;
