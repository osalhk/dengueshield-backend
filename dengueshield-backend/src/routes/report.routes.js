const express = require("express");
const router = express.Router();
const admin = require("../config/firebaseAdmin");

const db = admin.firestore();

// Fetch all reports from Firestore
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("reports").orderBy("createdDate", "desc").get();
    const reports = [];
    snapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });
    res.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new report in Firestore
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      latitude,
      longitude,
      address,
      imageUrl,
      reportType,
      description,
      status,
      riskLevel,
      verificationCount,
    } = req.body;

    const newReport = {
      userId: userId || "anonymous",
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      address: address || "",
      imageUrl: imageUrl || "",
      reportType: reportType || "other",
      description: description || "",
      status: status || "pending",
      riskLevel: riskLevel || "medium",
      verificationCount: parseInt(verificationCount) || 0,
      createdDate: new Date().toISOString(),
    };

    const docRef = await db.collection("reports").add(newReport);
    res.status(201).json({ success: true, id: docRef.id, report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update report status in Firestore
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.collection("reports").doc(id).update({ status });
    res.json({ success: true, message: `Report status updated to ${status}` });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
