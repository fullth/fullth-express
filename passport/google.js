const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passportConfig = require('../config/passport')

// Google login
module.exports = function(app, passport, db) {
    return new GoogleStrategy(
        {
            clientID: passportConfig.google.CLIENT_ID,
            clientSecret: passportConfig.google.CLIENT_SECRET,
            callbackURL: passportConfig.google.CALLBACK_URL,
            passReqToCallback: true,
        }, function (request, accessToken, refreshToken, profile, done) {
            console.dir(profile);

            db.query("SELECT * FROM Users WHERE provider = ? AND email = ?", [profile.provider, profile.email
                ], function(err, result) {
                    console.dir(result);
                    if(err) { throw err; }
                    
                    if(result.length == 0) {
                        db.query("INSERT INTO Users (email, password, provider, name) VALUES (?, ?, ?, ?)", [
                            profile.email, profile.sub, profile.provider, profile.displayName
                            ], function(err) {
                            if (err) { throw err; }
                        });
                    }
                }
            );

            return done(null, profile);
        }
    )
};