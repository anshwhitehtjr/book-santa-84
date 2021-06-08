import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDDHTPG5YKaBRW-C3N7MMarbmpaFMEETw8",
  authDomain: "booksantaapp-ba631.firebaseapp.com",
  databaseURL: "https://booksantaapp-ba631.firebaseio.com",
  projectId: "booksantaapp-ba631",
  storageBucket: "booksantaapp-ba631.appspot.com",
  messagingSenderId: "304036398288",
  appId: "1:304036398288:web:ea8e5286012a847a474ad5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
