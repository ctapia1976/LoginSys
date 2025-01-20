import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjTXLNkj9lo0KLpdJKVNnEbQrrFAlN3e0",
  authDomain: "tapia-42c2e.firebaseapp.com",
  projectId: "tapia-42c2e",
  storageBucket: "tapia-42c2e.firebasestorage.app",
  messagingSenderId: "583677432175",
  appId: "1:583677432175:web:999200d75027aded92d89a" 
};


    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    export const signInWithGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    };

    export const signUpWithEmail = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };

    export const signInWithEmail = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
