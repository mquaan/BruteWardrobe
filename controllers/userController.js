import db from '../config/firebase.js';
import user from '../models/user.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const controller = {};

controller.login = async (req, res) => {
    try {
        let { userName, password } = req.body;
        const querySnapshot = await getDocs(collection(db, 'customers'));
        const customers = [];
        querySnapshot.forEach((doc) => {
            customers.push(doc.data());
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};