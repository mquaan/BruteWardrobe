import db from '../config/firebase.js';
import User from '../models/user.js';
import { collection, addDoc } from 'firebase/firestore';

const create = async (req, res) => {
    try {
        const ref = collection(db, 'users').withConverter(User.userConverter);
        const user = new User(
            'Nguyen Van A',
            '123',
            '123',
            'Nguyen Van Cu',
            '123456789',
            '123@gmail.com',
            false
        );
        await addDoc(ref, User.userConverter.toFirestore(user));
        res.send('Success');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export default create;
