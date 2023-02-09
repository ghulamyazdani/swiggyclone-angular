const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      console.log(email, password);
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) throw error;
          console.log(user);
          if (isMatch) {
            return done(null, true, user);
          } else {
            return done(null, false, { message: "password incorrect" });
          }
        });
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
