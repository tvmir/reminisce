// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDcQFkBJlC2heKc0U7lr9qphBNxPK2w5N4',
  authDomain: 'reminisce-alpha.firebaseapp.com',
  projectId: 'reminisce-alpha',
  storageBucket: 'reminisce-alpha.appspot.com',
  messagingSenderId: '794117636434',
  appId: '1:794117636434:web:ae07bf342bf5b8aa287a8b',
  measurementId: 'G-R6B074V8LD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
