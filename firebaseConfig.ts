// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getDatabase} from "firebase/database";
// TODO: Home SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiqZlDQvM-BpLraBi0zSwhbYoKJcGEpQo",
    authDomain: "remember-me-999ff.firebaseapp.com",
    databaseURL: "https://remember-me-999ff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "remember-me-999ff",
    storageBucket: "remember-me-999ff.appspot.com",
    messagingSenderId: "351847013821",
    appId: "1:351847013821:web:17ea89fdded586638c86d4",
    measurementId: "G-DLN90S7FHT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const useDatabase = getDatabase(app);
