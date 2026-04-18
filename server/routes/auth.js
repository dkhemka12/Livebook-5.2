
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
let users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const user = { id: Date.now(), email, password };
  users.push(user);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
