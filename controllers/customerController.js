import db from '../config/firebase.js';
import Customer from '../models/customer.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const customerConverter = {
    toFirestore: (customer) => {
        return {
            userName: customer.userName,
            userID: customer.userID,
            password: customer.password,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            loginStatus: customer.loginStatus,
            activeStatus: customer.activeStatus,
            shopping: customer.shopping,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Customer(data.userName, data.userID, data.password, data.address, data.phoneNumber, data.email);
    },
};

const controller = {};

controller.create = async (req, res) => {
    try {
        let { userName, userID, password, address, phoneNumber, email } = req.body;
        const ref = collection(db, 'customers').withConverter(customerConverter);
        const customer = new Customer(userName, userID, password, address, phoneNumber, email);
        await addDoc(ref, customer);
        res.send('Success');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

controller.read = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'customers'));
        querySnapshot.forEach((doc) => {
            res.json(doc.data());
            console.log(doc.data());
        });
    } catch (error) {
        return res.status(500).json(error.message); 
    }
};

export default controller;
