// Import Firebase from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFg08Dntuv9KAClESS1bd75OYRUEvKM3c",
  authDomain: "fir-auth-33a83.firebaseapp.com",
  projectId: "fir-auth-33a83",
  storageBucket: "fir-auth-33a83.firebasestorage.app",
  messagingSenderId: "1026556723055",
  appId: "1:1026556723055:web:a5204254d53911cffa329a",
  measurementId: "G-4GZ7CJ550X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility functions to manage authentication
const AuthService = {
  // Create new user
  createUser: (email, password) => 
    createUserWithEmailAndPassword(auth, email, password),

  // Sign in user
  signInUser: (email, password) => 
    signInWithEmailAndPassword(auth, email, password),

  // Logout user
  signOutUser: () => 
    signOut(auth),

  // Track user state
  onAuthStateChange: (callback) => 
    onAuthStateChanged(auth, callback),

  // Add user to Firestore
  addUserFirestore: async (uid, email) => {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      createdAt: new Date(),
    });
  },

  updateUser : async(uid, userData) => {
    await setDoc(doc(db, "users", uid), userData, { merge: true });
  }
};

// Export for reuse
export { auth, db, AuthService };
