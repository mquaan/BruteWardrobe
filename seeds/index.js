import db from '../config/firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, merchantConverter } from '../models/merchant.js';
import { Admin, adminConverter } from '../models/admin.js';
import { Product, productConverter } from '../models/product.js';
import { Shopping, shoppingConverter } from '../models/shopping.js';


import { customers, shoppings, merchants, admins, products } from './data.js';

const collections = ['customers', 'shoppings', 'merchants', 'admins', 'products'];
// const collections = ['merchants'];

for (let collectionName of collections) {
    const ref = collection(db, collectionName);
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

let ref = collection(db, 'customers').withConverter(customerConverter);
let custIds = [];
for (let item of customers) {
    const customer = new Customer(
        item.username,
		item.password,
		item.email,
		item.facebookId,
		item.userId,
		item.address,
		item.phoneNumber,
		item.loginStatus,
		item.gender,
		item.dob,
		item.activeStatus
    );
    const docRef = await addDoc(ref, customer);
    custIds.push(docRef.id);
    await updateDoc(docRef, { userId: docRef.id });
}

ref = collection(db, 'shoppings').withConverter(shoppingConverter);
for (let i = 0; i < shoppings.length; i++) {
    let item = shoppings[i];
    const shopping = new Shopping(
        item.orderList,
		item.cart,
		custIds[i],
    );
    const docRef = await addDoc(ref, shopping);
    // await updateDoc(docRef, { shoppingId: docRef.id });
}

ref = collection(db, 'merchants').withConverter(merchantConverter);
for (let item of merchants) {
    let merchant = new Merchant(item.username, item.password, item.salary, item.email,
        item.facebookId, item.userId, item.address, item.phoneNumber,
        item.loginStatus, item.gender, item.dob, item.dateCreated);
    merchant.dateCreated = merchant.dateCreated.toISOString();
    const docRef = await addDoc(ref, merchant);
    await updateDoc(docRef, { userId: docRef.id });
}

ref = collection(db, 'admins').withConverter(adminConverter);
for (let item of admins) {
    const admin = new Admin(item.username, item.password);
    const docRef = await addDoc(ref, admin);
    await updateDoc(docRef, { userId: docRef.id });
}

ref = collection(db, 'products').withConverter(productConverter);
for (let item of products) {
    const product = new Product(
        item.name, 
        item.description, 
        item.imgURLs, 
        item.price, 
        item.rate, 
        0, 
        null, 
        null
    );
    const docRef = await addDoc(ref, product);
    await updateDoc(docRef, { productId: docRef.id });
}

console.log("Seed data successfully!")
