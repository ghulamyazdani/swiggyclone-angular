// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const passport = require("passport");

// router.post("/signup", (req, res) => {
//   const data = req.body;
//   let errors = [];

//   if (
//     !data.first_name ||
//     !data.last_name ||
//     !data.username ||
//     !data.phone_number ||
//     !data.email ||
//     !data.password ||
//     !data.confirm_password
//   ) {
//     errors.push({ msg: "Please enter all fields" });
//   }

//   if (data.password != data.confirm_password) {
//     errors.push({ msg: "Passwords do not match" });
//   }

//   if (data.password.length < 6) {
//     errors.push({ msg: "Password must be at least 6 characters" });
//   }
//   if (errors.length > 0) {
//     res.send(
//       JSON.stringify({
//         errors,
//         first_name: data.first_name,
//         last_name: data.last_name,
//         username: data.username,
//         phone_number: data.phone_number,
//         email: data.email,
//         password: data.password,
//         confirm_password: data.confirm_password,
//       })
//     );
//   } else {
//     // res.send("pass");
//     User.findOne({ email: data.email, username: data.username }).then(
//       (user) => {
//         if (user) {
//           errors.push({ msg: "Email already exists" });
//           res.send(
//             JSON.stringify({
//               errors,
//               first_name: data.first_name,
//               last_name: data.last_name,
//               username: data.username,
//               phone_number: data.phone_number,
//               email: data.email,
//               password: data.password,
//               confirm_password: data.confirm_password,
//             })
//           );
//         } else {
//           const newUser = new User({
//             first_name: data.first_name,
//             last_name: data.last_name,
//             username: data.username,
//             phone_number: data.phone_number,
//             email: data.email,
//             password: data.password,
//           });
//           bcrypt.genSalt(10, function (err, salt) {
//             bcrypt.hash(newUser.password, salt, function (err, hash) {
//               if (err) throw err;
//               newUser.password = hash;
//               newUser
//                 .save()
//                 .then(function (user) {
//                   res.send(JSON.stringify(user));
//                 })
//                 .catch(function (err) {
//                   console.log(err);
//                 });
//             });
//           });
//         }
//       }
//     );
//   }
// });

// // router.post("/login", (req, res, next) => {
// //   passport.authenticate("local", {

// //   })(req, res, next);

// //   res.send(JSON.stringify(req.body));
// // });
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", function (e, isLogged, message) {
//     // console.log(e, isLogged, message);
//     res.send(message);
//   })(req, res, next);
// });

// router.get("/logout", (req, res, next) => {
//   req.logOut(function (err) {
//     if (err) {
//       return next(err);
//     }
//     // res.redirect("/");
//     res.send("Logged out");
//   });
// });
// router.get("/", (req, res, next) => {
//   res.send(req.user.username);
// });

// module.exports = router;
