const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, async (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

});

module.exports = router;