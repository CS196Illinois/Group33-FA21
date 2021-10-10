/* 2.1 Simple Server-side Node JS and
 * Original Code by Daniel Schiffman
 * Tutorial from The Coding Train: https://www.youtube.com/watch?v=wxbQP1LMZsw
 * Copied by Owen Cushing (owenpc2)
 */
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'));