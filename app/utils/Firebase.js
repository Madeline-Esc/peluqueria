import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBsEPC4kl4gjEHvlcYenEyENPjBfwUvbfM",
    authDomain: "perfecthair-c7cbe.firebaseapp.com",
    projectId: "perfecthair-c7cbe",
    storageBucket: "perfecthair-c7cbe.appspot.com",
    messagingSenderId: "672396904943",
    appId: "1:672396904943:web:897422fe370f209e6ece1a"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)