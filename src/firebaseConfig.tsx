// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "svelte-todo-f5584.firebaseapp.com",
  projectId: "svelte-todo-f5584",
  storageBucket: "svelte-todo-f5584.appspot.com",
  messagingSenderId: "358514863823",
  appId: "1:358514863823:web:4a39e360dc291c7124d1ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
