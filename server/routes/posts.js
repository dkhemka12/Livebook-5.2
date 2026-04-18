
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
let posts = [];

router.get("/", auth, (req, res) => res.json(posts));

router.post("/", auth, (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", auth, (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  post.title = req.body.title || post.title;
  res.json(post);
});

router.delete("/:id", auth, (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
