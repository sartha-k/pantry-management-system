// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP9HVmP0gs8l4w9Cxk-8hG_2YDsznGV7U",
  authDomain: "inventort-managment.firebaseapp.com",
  projectId: "inventort-managment",
  storageBucket: "inventort-managment.appspot.com",
  messagingSenderId: "59441055403",
  appId: "1:59441055403:web:8dadc6f2d0e9bc747119ee",
  measurementId: "G-LK2YMV4ELH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
export {firestore}