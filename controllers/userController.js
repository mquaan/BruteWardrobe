import db from '../config/firebase.js';
import user from '../models/user.js';
import { collection, addDoc, getDocs, where, getDoc } from 'firebase/firestore';

const controller = {};

controller.login = async (req, res) => {
    try {
        let { username, password, isEmail } = req.body;
        let roles = ['customers', 'merchants', 'admins'];
        
        let success = false;
        for (let role in roles) {
            const ref = collection(db, role);
            let q;
            if (!isEmail) {
                q = query(ref, where("username", "==", username), 
                where("password", "==", password));
            }
            else {
                q = query(ref, where("email", "==", username), 
                where("password", "==", password));
            }
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                success = true;
                res.redirect(`/${role}`);
            }
        }


    } catch (error) {
        return res.status(500).json(error.message);
    }
};