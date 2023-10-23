const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: "661794186721-cntrp7nqr29p3ftueb1flnh3lfmslk32.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
