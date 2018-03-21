const passport = require('passport');

module.exports = (app) => {
    //login
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    //google login callback
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    });
}