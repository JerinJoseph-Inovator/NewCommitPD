import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use :: https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAz9Caozdz1xskiN52Y7m0YwJZNpECodoY",
  authDomain: "reva2-aca6e.firebaseapp.com",
  projectId: "reva2-aca6e",
  storageBucket: "reva2-aca6e.appspot.com",
  messagingSenderId: "1075386175986",
  appId: "1:1075386175986:web:f6f07d3fe8dee8d1dc5b6b",
  measurementId: "G-PQC5Q8DZB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);


export { app, auth, storage, db };
