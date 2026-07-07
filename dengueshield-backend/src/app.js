const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Connected Successfully 🚀",
  });
});

module.exports = app;