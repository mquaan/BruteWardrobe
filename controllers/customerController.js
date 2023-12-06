import db from '../config/firebase.js';
import { Customer, customerConverter } from '../models/customer.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const controller = {};

controller.home = async (req, res) => {
    
}

controller.create = async (req, res) => {
    try {
        let { username, userID, password, address, phoneNumber, email } = req.body;
        const ref = collection(db, 'customers').withConverter(customerConverter);
        const customer = new Customer(username, userID, password, address, phoneNumber, email);
        await addDoc(ref, customer);
        res.send('Success');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

controller.read = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'customers'));
        const customers = [];
        querySnapshot.forEach((doc) => {
            // Add each document's data to the customers array
            customers.push(doc.data());
        });
        // Send the response with the customers array
        res.json(customers);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


export default controller;
