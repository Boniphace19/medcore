import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCd3ztt2z4DFshOgAA8ZV-5wr107URcf_Y",
  authDomain: "medcore-c4afe.firebaseapp.com",
  projectId: "medcore-c4afe",
  storageBucket: "medcore-c4afe.appspot.com",
  messagingSenderId: "589522427746",
  appId: "1:589522427746:web:5fe7fea5de514be980563b",
  measurementId: "G-LJZ4XX9508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, analytics };
