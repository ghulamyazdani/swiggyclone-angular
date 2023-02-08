const express = require("express");
const app = express();
const fs = require("fs");
// const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`);
});
