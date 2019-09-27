// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
// const User = mongoose.model('users');
// const keys = require('../config/keys');

const passport = require('passport');
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: keys.jwt
// };
// TODO
function verifyClient(clientId, clientSecret, done) {
    db.clients.findByClientId(clientId, (error, client) => {
        if (error) return done(error);
        if (!client) return done(null, false);
        if (client.clientSecret !== clientSecret) return done(null, false);
        return done(null, client);
    });
}

passport.use(new ClientPasswordStrategy(verifyClient));

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy(options, async (payload, done) => {
//             try {
//
//                 const user = await User.findById(payload.userId).select('email id');
//                 if (user) {
//                     done(null, user)
//                 } else {
//                     done(null, false)
//                 }
//             }
//             catch (e) {
//                 console.log(e);
//             }
//         })
//     )
// };