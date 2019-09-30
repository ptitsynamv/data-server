const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const fetch = require('node-fetch');
const keys = require('../config');

passport.use(new BearerStrategy(
    (token, done) => {
        fetch(keys.oauth2Server.url + keys.oauth2Server.userInfoUrl, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            method: 'GET',
        })
            .then(res => res.json())
            .then((json) => {
                done(null, json);
            })
            .catch((err) => {
                return done(null, false);
            })
    }
));
