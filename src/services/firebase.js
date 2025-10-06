// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGSO5yBNKVEMnsDNkLgUw3a1Q2fRhChK8",
  authDomain: "fitness-loft-3a885.firebaseapp.com",
  projectId: "fitness-loft-3a885",
  storageBucket: "fitness-loft-3a885.firebasestorage.app",
  messagingSenderId: "206977971007",
  appId: "1:206977971007:web:9ff45c30fe1b730c1dd98a",
  measurementId: "G-4L53RKN9PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;