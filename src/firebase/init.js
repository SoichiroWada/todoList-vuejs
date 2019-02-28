import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBd5EdcYKFdqpHXNyCdos0ijlmez8mB4Po",
    authDomain: "todo-list-21740.firebaseapp.com",
    databaseURL: "https://todo-list-21740.firebaseio.com",
    projectId: "todo-list-21740",
    storageBucket: "todo-list-21740.appspot.com",
    messagingSenderId: "761681417661"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()