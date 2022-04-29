import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA5g7adsY0Hyu-u3q84UXH6dWQUVNCRw-M",
  authDomain: "peluqueria-bfc23.firebaseapp.com",
  projectId: "peluqueria-bfc23",
  storageBucket: "peluqueria-bfc23.appspot.com",
  messagingSenderId: "804932256005",
  appId: "1:804932256005:web:7fc0f5d1bb1776a208376c"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)