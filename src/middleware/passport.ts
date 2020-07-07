import passport from 'passport'
import fetch from 'node-fetch'
import bearer from 'passport-http-bearer';
import keys from '../config/keys';

const BearerStrategy = bearer.Strategy;

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
