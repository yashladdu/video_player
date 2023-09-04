import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCkxh-of1YXJJh6qHI6Znrz0Gio2mwCVAQ",
  authDomain: "video-plyer-4a6ac.firebaseapp.com",
  projectId: "video-plyer-4a6ac",
  storageBucket: "video-plyer-4a6ac.appspot.com",
  messagingSenderId: "539024022136",
  appId: "1:539024022136:web:3be4983c554a35ef55ab8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;