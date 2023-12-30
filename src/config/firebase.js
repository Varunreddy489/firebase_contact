// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuqDZbMNirN9olqYdDpJwwf8sLH00Cz-I",
  authDomain: "vite-contact-a34a1.firebaseapp.com",
  projectId: "vite-contact-a34a1",
  storageBucket: "vite-contact-a34a1.appspot.com",
  messagingSenderId: "375174593331",
  appId: "1:375174593331:web:ed495c68fc16b863d71c46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);