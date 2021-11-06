const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const { response } = require('express');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
// Essentially takes POST form requests and parses the body into JSON format.
// Unsure how this will work with file upload...
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/display', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/display.html'))
);

app.get('/upload-page', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/upload-page.html'))
  //res.render('/public/upload-page')
);

app.post('/upload-page', (req, res) => {
  console.log(req.body); //shows that req.body is in the JSON format due to exp
  res.redirect('/display'); // redirects to a different endpoint once finished
});