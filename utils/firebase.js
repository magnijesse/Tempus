import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtNsEpcER8utv9_Ch9nsVW4Bd6JcJSAlU",
  authDomain: "blueprint2023.firebaseapp.com",
  projectId: "blueprint2023",
  storageBucket: "blueprint2023.appspot.com",
  messagingSenderId: "518418044074",
  appId: "1:518418044074:web:3063fdd4f790af180aecd3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
