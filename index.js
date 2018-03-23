const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

//models
require('./models/User');

//services
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//auth
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log('listening port:', PORT);
});