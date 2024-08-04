// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
const firestore = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  // Only initialize Analytics if on the client-side
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { firestore, analytics };
