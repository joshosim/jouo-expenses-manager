import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlQSn0wZuASmJIosEN8fD5WLxtq2NGtFc",
  authDomain: "jouo-e5240.firebaseapp.com",
  projectId: "jouo-e5240",
  storageBucket: "jouo-e5240.appspot.com",
  messagingSenderId: "316923815344",
  appId: "1:316923815344:web:af3644ac918a322385a275",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
