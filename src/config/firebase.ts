// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXtPtm-A5Dq4lC4H2oxZ6Fqt9K3OlYlI0",
  authDomain: "sihcodevision-391de.firebaseapp.com",
  projectId: "sihcodevision-391de",
  storageBucket: "sihcodevision-391de.appspot.com",
  messagingSenderId: "677813649923",
  appId: "1:677813649923:web:6fc1c2c8d40ed43ec20436",
  measurementId: "G-N3WHK7151C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);