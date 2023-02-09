const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!" + req.user.username);
});

module.exports = router;
