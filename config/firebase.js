import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyDNuzCNSi1lAILxNOhT-pZ9TS1OsYUpbQA',
    authDomain: 'brutewardrobe.firebaseapp.com',
    databaseURL:
        'https://brutewardrobe-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'brutewardrobe',
    storageBucket: 'brutewardrobe.appspot.com',
    messagingSenderId: '444692912761',
    appId: '1:444692912761:web:5b7518ef29c38f433ed2a8',
    measurementId: 'G-YC8YRY457L',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;