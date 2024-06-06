// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crud-project3-569a4.firebaseapp.com",
  projectId: "crud-project3-569a4",
  storageBucket: "crud-project3-569a4.appspot.com",
  messagingSenderId: "780513157470",
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: "G-86TGNJ2TW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;