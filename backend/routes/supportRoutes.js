const express = require("express");
const router = express.Router();
const { getSupportHistory, getAllSupportChats, getAdminUserHistory } = require("../controllers/supportController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/history", protect, getSupportHistory);
router.get("/admin/all", protect, adminOnly, getAllSupportChats);
router.get("/admin/history/:userId", protect, adminOnly, getAdminUserHistory);

module.exports = router;
