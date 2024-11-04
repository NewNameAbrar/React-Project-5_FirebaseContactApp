// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuYgClVU6UvWen5FokXc1Q6ngytg2I3EE',
  authDomain: 'vite-contact-27a9b.firebaseapp.com',
  projectId: 'vite-contact-27a9b',
  storageBucket: 'vite-contact-27a9b.firebasestorage.app',
  messagingSenderId: '400445363069',
  appId: '1:400445363069:web:ae2e5435e8cd07bbebb214',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
