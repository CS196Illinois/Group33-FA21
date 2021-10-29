/* 2.1 Simple Server-side Node JS and
 * Original Code by Daniel Schiffman
 * Tutorial from The Coding Train: https://www.youtube.com/watch?v=wxbQP1LMZsw
 * Copied by Owen Cushing (owenpc2)
 */
const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post('/api', (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
});