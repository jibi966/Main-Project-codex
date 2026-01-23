const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, getLeaderboard, getXPStats } = require("../controllers/userController");

router.get("/profile", protect, getUserProfile);
router.get("/leaderboard", protect, getLeaderboard);
router.get("/stats", protect, getXPStats);

module.exports = router;
