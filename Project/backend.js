const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const express = require('express')
const fetch = require('node-fetch')

//import firebase things
const initFirebase = require('firebase/app')
const firebaseStorage = require('firebase/storage')
const firebaseFirestore = require('firebase/firestore')
const {getFirestore, Timestamp, FieldValue, GeoPoint} = require('firebase/firestore')
const { json } = require('express')
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
}

// Initialize Firebase
const firebase = initFirebase.initializeApp(firebaseConfig) // is a firebase app instance
const storage = firebaseStorage.getStorage(firebase) // is a FirebaseStorage Instance
const db = firebaseFirestore.getFirestore(firebase) // should be a FirebaseStorage Instance
const dots = firebaseFirestore.collection(db, 'dots') //represents

// initialize https
const options = {
    key: fs.readFileSync('sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('sslcert/cert.pem', 'utf8')
}

// build app
const app = express()
app.use(express.static('public'))
app.use(express.json())

/* 
* Load JSON files from firestore on initialization
* this decreases the amount of requests we have to make to the API
* so it should speed up performance client-side at the cost of init speed.
*/
const jsonList = new Map();
async function getJsonList() {
    firebaseFirestore.getDocs(dots)
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            jsonList.set(doc.id, doc.data())
        })
    })
    console.log("initialized!")
}


// initial endpoint. we might change this to the map later.
app.get('/', (_, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// map endpoint.
app.get('/map', (_, res) =>
    res.sendFile(path.join(__dirname, '/public/map.html'))
)

// audio list endpoint.
app.get('/browse', (_, res) =>
    res.sendFile(path.join(__dirname, '/public/browse.html'))
)

// upload page endpoint.
app.get('/upload', (_, res) => {
    res.sendFile(path.join(__dirname, '/public/upload.html'))
})

// gets JSON file from firebase db
app.get('/firebaseJSON', (req, res) => {
   let id = req.headers.id.replace(/\"/g, "")
   res.send(jsonList.get(id))
})

// gets audio file from firebase db
app.get('/firebaseAudio', (req, res) => {
    const pathReference = firebaseStorage.ref(storage, `audio/${req.headers.file.replace(/\"/g, "")}`)
    firebaseStorage.getDownloadURL(pathReference)
    .then(url => {
      res.send(url)
    })
})

// gets the list of data IDS from firebase db
app.get('/getAudioList', (_, res) => {
    const toSend = {}
    const ids = []
    jsonList.forEach((_, id) => {
        ids.push(id)
    })
    toSend['ids'] = ids
    res.send(toSend)
})

// runs app on both https and http
const httpsServer = https.createServer(options, app)
const httpServer = http.createServer(app)
module.exports = app

getJsonList()
httpServer.listen(3000, () => console.log("listening at port 3000"))
httpsServer.listen(8000, () => console.log('https on port 8000'))