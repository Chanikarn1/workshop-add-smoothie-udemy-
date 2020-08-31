import firebase from 'firebase'
import firestore from 'firebase/fireStore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDwQL4hAm2UuQWm6Te4mveucB75ugjbEtc",
    authDomain: "udemy-ninja-smoothie-e8c66.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothie-e8c66.firebaseio.com",
    projectId: "udemy-ninja-smoothie-e8c66",
    storageBucket: "udemy-ninja-smoothie-e8c66.appspot.com",
    messagingSenderId: "226296546660",
    appId: "1:226296546660:web:7c3708265ba28abf9fe671",
    measurementId: "G-TQGLYN4VLS"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
 // firebaseApp.firestore().settings({timestampsInSnapshots: true})
  firebase.analytics();

  //export firestore database
  export default firebaseApp.firestore()