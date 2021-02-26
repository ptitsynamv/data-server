import passport from 'passport'
import fetch from 'node-fetch'
import bearer from 'passport-http-bearer';

const BearerStrategy = bearer.Strategy;

passport.use(new BearerStrategy(
    (token, done) => {
        fetch(process.env.OAUTH_SERVER_URL + process.env.USER_INFO_URL, {
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
