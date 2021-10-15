var fs = require('fs')
var path = require('path');
var https = require('https');
var http = require('http');

// api key is hidden here and .gitignored. if you need the key, let jamie know
import {key} from key.js

// Code from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);


const options = {
    key: fs.readFileSync('sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('sslcert/cert.pem', 'utf8')
};

const express = require('express');
const exp = express();
exp.use(express.static('public'))


exp.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/landing.html'))
);

exp.get('/map', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/map.html'))
);

exp.get('/audio', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/audio.html'))
);

var httpsServer = https.createServer(options, exp);
var httpServer = http.createServer(exp);
module.exports = exp;

httpServer.listen(3000, () => console.log("listening at port 3000"));
httpsServer.listen(8000, () => console.log('https on port 8000'));