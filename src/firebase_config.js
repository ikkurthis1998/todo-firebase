
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDM8BdwkaNyq2bhol5UCNuZQbvDbI9PGow",
    authDomain: "learn-firebase-now.firebaseapp.com",
    projectId: "learn-firebase-now",
    storageBucket: "learn-firebase-now.appspot.com",
    messagingSenderId: "1050634427768",
    appId: "1:1050634427768:web:324ac4c5d135507e2abc8d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { db };