import db from '../config/firebase.js';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';

import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, customerConverter } from '../models/merchant.js';
import { Admin, customerConverter } from '../models/admin.js';

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
    console.log(customer);
}

ref = collection(db, 'customers').withConverter(customerConverter);
for (let item of customers) {
    const customer = new Customer(item.username, item.password, item.email);
    const docRef = await addDoc(ref, customer);
    await updateDoc(docRef, { userID: docRef.id });
    console.log(customer);
}

ref = collection(db, 'customers').withConverter(customerConverter);
for (let item of customers) {
    const customer = new Customer(item.username, item.password, item.email);
    const docRef = await addDoc(ref, customer);
    await updateDoc(docRef, { userID: docRef.id });
    console.log(customer);
}
