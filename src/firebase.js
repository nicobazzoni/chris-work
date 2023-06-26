// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb6nBHafR_pALUYfGIvx4aF9CxRuONZCk",
  authDomain: "chris-fox.firebaseapp.com",
  projectId: "chris-fox",
  storageBucket: "chris-fox.appspot.com",
  messagingSenderId: "320453167922",
  appId: "1:320453167922:web:16f1ac39a93509ec15e52b"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized");
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
