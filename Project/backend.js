const fs = require('fs')
const path = require('path');
const https = require('https');
const http = require('http');
const express = require('express');
const fetch = require('node-fetch');
// const Blob = require('node:buffer');

//import firebase things
const initFirebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
// putting the API key on the internet is bad. Get the key.js file from discord
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
const storage = firebaseStorage.getStorage(firebase); // is a FirebaseStorage Instance
const storageRef = firebaseStorage.ref(storage); // is a reference to our storage

// initialize https
const options = {
    key: fs.readFileSync('sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('sslcert/cert.pem', 'utf8')
};

// build app
const app = express();
app.use(express.static('public'))
app.use(express.json())

// initial endpoint. we might change this to the map later.
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// map endpoint.
app.get('/map', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/map.html'))
);

// audio list endpoint.
app.get('/browse', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/browse.html'))
);

// upload page endpoint.
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/upload.html'))
});

// gets JSON file from firebase db
app.get('/firebaseJSON', (req, res) => {
    const pathReference = firebaseStorage.ref(storage, `data/${req.headers.id.replace(/\"/g, "")}.json`)
    firebaseStorage.getDownloadURL(pathReference)
    .then(response => fetch(response))
    .then(response => response.json())
    .then(data => res.send(data))
})

//Fixed: gets audio file from firebase db
app.get('/firebaseAudio', async (req, res) => {
    const pathReference = firebaseStorage.ref(storage, 
        `audio/${req.headers.id.replace(/\"/g, "")}.${req.headers.type.replace(/\"/g, "")}`)
    await firebaseStorage.getDownloadURL(pathReference)
    .then(url => {
      res.send(url)
      // fetch(url)
    })
});

// runs app on both https and http
const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);
module.exports = app;

httpServer.listen(3000, () => console.log("listening at port 3000"));
httpsServer.listen(8000, () => console.log('https on port 8000'));