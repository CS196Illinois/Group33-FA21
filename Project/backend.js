const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Successful response.');
});


app.get('/add', (req, res) => {
    res.send("added numbers: " + (req.query.first + req.query.second));
  });

app.listen(3000, () => console.log('Example app is listening on port 3000.'));