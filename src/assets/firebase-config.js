import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxuR9BU0jWKNuSvbaHOXa16F6FRX4cmhE",
  authDomain: "chat-app-595ef.firebaseapp.com",
  databaseURL: "https://chat-app-595ef-default-rtdb.firebaseio.com",
  projectId: "chat-app-595ef",
  storageBucket: "chat-app-595ef.appspot.com",
  messagingSenderId: "348146717134",
  appId: "1:348146717134:web:e6b9519df4bd3d91645b9f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
