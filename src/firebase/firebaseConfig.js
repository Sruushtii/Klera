// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeinXV9Yw4kfOxECOPXGASfPgEw962q3w",
  authDomain: "klera-mvp.firebaseapp.com",
  projectId: "klera-mvp",
  storageBucket: "klera-mvp.firebasestorage.app",
  messagingSenderId: "135833978491",
  appId: "1:135833978491:web:428568e687c66f1d2444de",
  measurementId: "G-QF9JLFD42W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
