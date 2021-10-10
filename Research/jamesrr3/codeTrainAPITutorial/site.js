'use strict';

var fs = require('fs')
var https = require('https');
var http = require('http');

/* 
* because these keys are self-generated, most web browsers will
* assume insecurity and not let you connect using HTTPS. you should
* be able to get past the warning for testing purposes, but for 
* release we should find a way to get properly certified keys.
*/

const options = {
    key: fs.readFileSync('sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('sslcert/cert.pem', 'utf8')
};

const express = require('express');
const app = express();

app.get('/', (req, res) =>
    res.sendFile('C:\\Users\\james\\Documents\\CS196\\Group33-FA21\\Research\\jamesrr3\\codeTrainAPITutorial\\public\\landing.html')
);

app.get('/map', (req, res) =>
    res.sendFile('C:\\Users\\james\\Documents\\CS196\\Group33-FA21\\Research\\jamesrr3\\codeTrainAPITutorial\\public\\map.html')
);

var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);
module.exports = app;

httpServer.listen(3000, () => console.log("listening at port 3000"));
httpsServer.listen(8000, () => console.log('https on port 8000'));