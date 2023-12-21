import db from '../config/firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, merchantConverter } from '../models/merchant.js';
import { Admin, adminConverter } from '../models/admin.js';

import { customers, merchants, admins } from './data.js';

import bcrypt from 'bcrypt';

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
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    item.password = bcrypt.hashSync(item.password, salt);
    const customer = new Customer(item.username, item.password, item.email);
    const docRef = await addDoc(ref, customer);
    await updateDoc(docRef, { userId: docRef.id });
}

ref = collection(db, 'merchants').withConverter(merchantConverter);
for (let item of merchants) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    item.password = bcrypt.hashSync(item.password, salt);
    const merchant = new Merchant(item.username, item.password, item.email);
    const docRef = await addDoc(ref, merchant);
    await updateDoc(docRef, { userId: docRef.id });
}

ref = collection(db, 'admins').withConverter(adminConverter);
for (let item of admins) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    item.password = bcrypt.hashSync(item.password, salt);
    const admin = new Admin(item.username, item.password);
    const docRef = await addDoc(ref, admin);
    await updateDoc(docRef, { adminId: docRef.id });
}

console.log("Seed data successfully!")
