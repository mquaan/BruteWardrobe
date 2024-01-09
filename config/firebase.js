import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCw6c7y_7YGeapDbc3VyXT9ZSO5Q04wtuI',
	authDomain: 'brutewardrobe3.firebaseapp.com',
	projectId: 'brutewardrobe3',
	storageBucket: 'brutewardrobe3.appspot.com',
	messagingSenderId: '608136176450',
	appId: '1:608136176450:web:fca57810bf13df945b9edb',
	measurementId: 'G-NGBQT22JTF',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
