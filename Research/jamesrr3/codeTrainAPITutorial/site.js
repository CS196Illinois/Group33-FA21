const express = require('express');
const app = express();

app.get('/', (req, res) =>
    res.sendFile('C:\\Users\\james\\Documents\\CS196\\Group33-FA21\\Research\\jamesrr3\\codeTrainAPITutorial\\mapTest.html')
);

app.listen(process.env.port || 3000)