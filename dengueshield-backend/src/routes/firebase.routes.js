const express = require("express");
const router = express.Router();

const admin = require("../config/firebaseAdmin");

router.get("/test", async (req, res) => {
  try {
    const users = await admin.auth().listUsers(1);

    res.json({
      success: true,
      message: "Firebase Admin Connected Successfully",
      users: users.users.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;