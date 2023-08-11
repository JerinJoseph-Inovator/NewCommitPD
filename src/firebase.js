import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAz9Caozdz1xskiN52Y7m0YwJZNpECodoY",
  authDomain: "reva2-aca6e.firebaseapp.com",
  projectId: "reva2-aca6e",
  storageBucket: "reva2-aca6e.appspot.com",
  messagingSenderId: "1075386175986",
  appId: "1:1075386175986:web:f6f07d3fe8dee8d1dc5b6b",
  measurementId: "G-PQC5Q8DZB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);

export { app, auth, storage };
