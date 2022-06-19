import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "todo-daily.firebaseapp.com",
  databaseURL: "https://todo-daily-default.firebasedatabase.app",
  projectId: "todo-daily",
  storageBucket: "todo-daily.appspot.com",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
