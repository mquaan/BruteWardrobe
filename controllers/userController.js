import db from '../config/firebase.js';
import { collection, query, getDocs, where, addDoc, updateDoc} from 'firebase/firestore';
import { Customer, customerConverter } from '../models/customer.js';
import { Merchant, merchantConverter } from '../models/merchant.js';
const controller = {};

controller.show = async (req, res) => {
    res.render('user/loginPage');
}

controller.login = async (req, res) => {
    console.log(req.body);
    try {
        let { username, password } = req.body;
        let isEmail = username.endsWith('@gmail.com');

        let roles = ['customers', 'merchants', 'admins'];
        
        let success = false;
        for (let role of roles) {
            const ref = collection(db, role);
            let q;
            if (!isEmail) {
                q = query(ref, where("username", "==", username), where("password", "==", password));
            } else {
                q = query(ref, where("email", "==", username), where("password", "==", password));
            }
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                success = true;
                // set the user data to req.body
                req.body.user = querySnapshot.docs[0].data();
                return res.redirect(`/${role}`);
            }
        }
        if (!success) {
            // Handle the case where no user is found
            res.status(404).send('User not found');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

controller.signup = async (req, res) => {
    console.log(req.body);
    try {
        let { username, email, password, role } = req.body;
        role = role.toLowerCase() + 's';
        let ref = collection(db, role);
        let q1 = query(ref, where("username", "==", username));
        let q2 = query(ref, where("email", "==", email));

        if (!getDocs(q1).empty && !getDocs(q2).empty) {
            let user;
            let reff;
            if (role == 'customers') {
                reff = collection(db, role).withConverter(customerConverter);
                user = new Customer(username, password, email);
            }
            else {
                reff = collection(db, role).withConverter(merchantConverter);
                user = new Merchant(username, password, email);
            }
            const docRef = await addDoc(reff, user);
            await updateDoc(docRef, { userID: docRef.id });

            return res.redirect(`/${role}`);
        }
        else {
            return res.status(409).send('User already exist');
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
}

export default controller;
