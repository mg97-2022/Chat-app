import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "lets-chat-mg97.firebaseapp.com",
  projectId: "lets-chat-mg97",
  storageBucket: "lets-chat-mg97.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore()
export const provider = new GoogleAuthProvider();
