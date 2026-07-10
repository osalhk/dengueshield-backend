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

const firebaseRoutes = require("./routes/firebase.routes");
const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/report.routes");

app.use("/api/firebase", firebaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;