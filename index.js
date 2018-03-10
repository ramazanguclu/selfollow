const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
    res.send({
        hi: 'test'
    });
});

const PORT = process.env.PORT || 1000;
app.listen(PORT);