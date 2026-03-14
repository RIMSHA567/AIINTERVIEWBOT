// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aiinterviewbot-8e62c.firebaseapp.com",
  projectId: "aiinterviewbot-8e62c",
  storageBucket: "aiinterviewbot-8e62c.firebasestorage.app",
  messagingSenderId: "246548983927",
  appId: "1:246548983927:web:99a08479cc6b1296d05672",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Firebase auth instance
export const provider = new GoogleAuthProvider(); // Google provider
