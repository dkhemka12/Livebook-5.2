// Basic Express server setup with CORS and JSON parsing, along with routes for authentication and posts.
// This server listens on a specified port and provides a health check endpoint to verify that the API is running.
// Import necessary modules and configure environment variables
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
