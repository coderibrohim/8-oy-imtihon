import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB3uRkarQgp71Tv4sP84DCEtX0cVsDYPs",
  authDomain: "auth-935ad.firebaseapp.com",
  projectId: "auth-935ad",
  storageBucket: "auth-935ad.firebasestorage.app",
  messagingSenderId: "540397038289",
  appId: "1:540397038289:web:ca07d47dc3f9b09c1cf3f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);