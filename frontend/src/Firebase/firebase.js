// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwqpiY2Ub_xoPNrZXJCgtKusUnUVPVb6k",
  authDomain: "listings-81f0b.firebaseapp.com",
  projectId: "listings-81f0b",
  storageBucket: "listings-81f0b.firebasestorage.app",
  messagingSenderId: "376913922889",
  appId: "1:376913922889:web:a15723cf1ee5f7d7e32898",
  measurementId: "G-FZRHB8F6GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}