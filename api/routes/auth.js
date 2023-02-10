var _ = require("lodash");
var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// var users = [
//   {
//     id: 1,
//     name: "javier",
//     password: "password123",
//   },
// ];

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "mysecretword";

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  // var user = users[_.findIndex(users, { id: jwt_payload.id })];
  User.findOne({ id: jwt_payload.id }).then((user) => {
    console.log(user);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

// var app = express();
// app.use(passport.initialize());

router.post("/signup", (req, res) => {
  const data = req.body;
  let errors = [];

  if (
    !data.first_name ||
    !data.last_name ||
    !data.username ||
    !data.phone_number ||
    !data.email ||
    !data.password ||
    !data.confirm_password
  ) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (data.password != data.confirm_password) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (data.password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.send(
      JSON.stringify({
        errors,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        phone_number: data.phone_number,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      })
    );
  } else {
    // res.send("pass");
    User.findOne({ email: data.email, username: data.username }).then(
      (user) => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.send(
            JSON.stringify({
              errors,
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
              phone_number: data.phone_number,
              email: data.email,
              password: data.password,
              confirm_password: data.confirm_password,
            })
          );
        } else {
          const newUser = new User({
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            phone_number: data.phone_number,
            email: data.email,
            password: data.password,
          });
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(function (user) {
                  res.send(JSON.stringify(user));
                })
                .catch(function (err) {
                  console.log(err);
                });
            });
          });
        }
      }
    );
  }
});

router.post("/login", function (req, res) {
  if (req.body.emailorusername && req.body.password) {
    var emailorusername = req.body.emailorusername;
    var password = req.body.password;
  }
  // res.send({ email, password });

  User.findOne({ email: emailorusername }).then((user) => {
    console.log(user);

    if (!user) {
      res.status(401).json({ message: "no such user found" });
    } else {
      bcrypt.compare(password, user.password, function (error, isMatch) {
        if (error) throw error;
        console.log(user);
        if (isMatch) {
          var payload = { id: user.id };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: "ok", token: token });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      });
    }
  });
});

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.json({ message: "Success!", some: req.user });
  }
);

router.get(
  "/secretDebug",
  function (req, res, next) {
    console.log(req.get("Authorization"));
    next();
  },
  function (req, res) {
    res.json("debugging");
  }
);

module.exports = router;
