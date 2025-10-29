import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLybTFuJcc99tDEpbl2iZZQfCgTnFWHgc",
  authDomain: "noyan-panel.firebaseapp.com",
  projectId: "noyan-panel",
  storageBucket: "noyan-panel.firebasestorage.app",
  messagingSenderId: "1004798835189",
  appId: "1:1004798835189:web:86c35e073f9819bc0a08bc",
  measurementId: "G-N26YJN0BF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
