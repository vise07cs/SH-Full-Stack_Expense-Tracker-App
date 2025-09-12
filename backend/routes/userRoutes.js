const express = require("express");
const router = express.Router();

// signup route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  console.log("New User:", name, email, password);

  res.json({ message: "User signed up successfully!" });
});

module.exports = router;
