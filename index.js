const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

require('./services/passport');

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 1000;
app.listen(PORT);