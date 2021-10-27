const path = require('path')
//import firebase things
const firebaseStorage = require('firebase/storage');
const initFirebase = require('firebase/app');
// putting the API key on the internet is bad. Get the key.js file from jamie
const key = require(path.resolve( __dirname, "./key.js"))

const firebaseConfig = {
  apiKey: key.MY_KEY,
  authDomain: "noisedot-a5ac4.firebaseapp.com",
  projectId: "noisedot-a5ac4",
  storageBucket: "noisedot-a5ac4.appspot.com",
  messagingSenderId: "1090527593409",
  appId: "1:1090527593409:web:2ddef0140e9174ce362540",
  measurementId: "G-V8W22V84X4"
};

// Initialize Firebase
const firebase = initFirebase.initializeApp(firebaseConfig);
const storage = firebaseStorage.getStorage(firebase);