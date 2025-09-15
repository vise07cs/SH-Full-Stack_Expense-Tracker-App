const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password with salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);

     // save user with hashed password
    await User.create({ name, email, password: hashedPassword });



    res.status(201).json({ message: "User signed up successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "No user exists with the given Email" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Password is incorrect , user is not aurthorized" });
    }

    res.json({ message: " User Login successful! Welcome " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});








module.exports = router;
