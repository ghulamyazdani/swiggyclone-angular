const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;
// Db connection
const db = require("./config/keys").MongoURI;
mongoose.set("strictQuery", true);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(function () {
    console.log("Connected with mongo");
  })
  .catch(function (error) {
    console.log(error);
  });

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passporjs init
app.use(passport.initialize());
app.use(passport.session());

// // passport config
// require("./config/passportlocal.js")(passport);

// Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
// const usersRouter = require("./routes/users");

app.use("/api/", indexRouter);
// app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`);
});
