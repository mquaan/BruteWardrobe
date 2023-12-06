import db from '../config/firebase.js';
import user from '../models/user.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const controller = {};

controller.checkValidPassword = function(req) {

    return true;
}