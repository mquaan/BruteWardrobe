import db from '../config/firebase.js';
import { collection, query, getDocs, where } from 'firebase/firestore';

const controller = {};

controller.show = async (req, res) => {
    res.render('user/loginPage');
}

controller.login = async (req, res) => {
    console.log(req.body);
    try {
        let { username, password, isEmail } = req.body;
        let roles = ['customers', 'merchants', 'admins'];
        
        let success = false;
        for (let role of roles) { // Changed to 'for...of' loop
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
                // Assuming you want to set the user data to req.body
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

export default controller;
