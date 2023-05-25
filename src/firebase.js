import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA3dfzIgoNF5lrQPuYa0CWK6OCb8Q1uuN0",
  authDomain: "cinemo-web-login.firebaseapp.com",
  projectId: "cinemo-web-login",
  storageBucket: "cinemo-web-login.appspot.com",
  messagingSenderId: "450843893597",
  appId: "1:450843893597:web:abe04192ea0871604d92b4",
  measurementId: "G-MN5JBCMDJG",
  databaseURL: "https://cinemo-web-login-default-rtdb.asia-southeast1.firebasedatabase.app/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;