const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

router.get("/signup", (req, res) => {
  res.send("Signup");
});

module.exports = router;
