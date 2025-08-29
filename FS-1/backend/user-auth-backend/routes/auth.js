const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth, authorizeRole } = require("../middleware/auth");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err.message); // Log actual error
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Protected Route (User Profile)
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Protected Admin Route
router.get("/admin", auth, authorizeRole("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin!" });
});

module.exports = router;
