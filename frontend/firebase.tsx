import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyBh3LsRzVQkyBf31q462xkWoYD1qY-1zrY",
  authDomain: "hackathon-32a45.firebaseapp.com",
  projectId: "hackathon-32a45",
  storageBucket: "hackathon-32a45.appspot.com",
  messagingSenderId: "878681343616",
  appId: "1:878681343616:web:6187f1daba307dc3d74865",
  measurementId: "G-LJMTW4PMSC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
