// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from firebase/app;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7nLATx9xKA1cA6gq5f_Y5ITdd8C9PdKA",
  authDomain: "house-marketplace-3a4ea.firebaseapp.com",
  projectId: "house-marketplace-3a4ea",
  storageBucket: "house-marketplace-3a4ea.appspot.com",
  messagingSenderId: "1096156684717",
  appId: "1:1096156684717:web:7f07d9e86a11983e154124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()