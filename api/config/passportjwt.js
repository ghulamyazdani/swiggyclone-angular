var passport = require("passport");
var passportJWT = require("passport-jwt");
const User = require("../models/User");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var config = require("../config/keys");
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;

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

module.exports = function (passport) {
  passport.use(strategy);
};
