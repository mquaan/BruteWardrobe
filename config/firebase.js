import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyDG1Xh5BGTmet4Ok6fB4LqHyYwj5xb0kLg',
    authDomain: 'brutewardrobe2.firebaseapp.com',
    projectId: 'brutewardrobe2',
    storageBucket: 'brutewardrobe2.appspot.com',
    messagingSenderId: '90657381259',
    appId: '1:90657381259:web:1d29e49ace57325e892d8e',
    measurementId: 'G-K0T2B9275B',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;