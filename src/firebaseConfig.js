// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDZOrp0R-uR-6ACA9Qk7Yn-7Ht94MKmsT4",

  authDomain: "contact-app-547cc.firebaseapp.com",

  projectId: "contact-app-547cc",

  storageBucket: "contact-app-547cc.firebasestorage.app",

  messagingSenderId: "1035772212629",

  appId: "1:1035772212629:web:8339d5ca407f368badb29c"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);