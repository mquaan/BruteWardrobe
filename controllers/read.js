import db from '../config/firebase.js';
import { collection, getDocs } from "firebase/firestore"; 

const read = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            res.json(doc.data());
            console.log(doc.data());
        });
    } catch (error) {
        return res.status(500).json(error.message); 
    }
};

export default read;
 