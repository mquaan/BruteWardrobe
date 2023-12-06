import db from '../config/firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, merchantConverter } from '../models/merchant.js';
import { Admin, adminConverter } from '../models/admin.js';

import { customers, merchants, admins } from './data.js';

const collections = ['customers', 'merchants', 'admins'];
for (let collectionName of collections) {
    const ref = collection(db, collectionName);
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

let ref = collection(db, 'customers').withConverter(customerConverter);
for (let item of customers) {
    const customer = new Customer(item.username, item.password, item.email);
    const docRef = await addDoc(ref, customer);
    await updateDoc(docRef, { userID: docRef.id });
}

ref = collection(db, 'merchants').withConverter(merchantConverter);
for (let item of merchants) {
    const merchant = new Merchant(item.username, item.password, item.email);
    const docRef = await addDoc(ref, merchant);
    await updateDoc(docRef, { userID: docRef.id });
}

ref = collection(db, 'admins').withConverter(adminConverter);
for (let item of admins) {
    const admin = new Admin(item.username, item.password);
    const docRef = await addDoc(ref, admin);
    await updateDoc(docRef, { adminID: docRef.id });
}

console.log("Seed data successfully!")
