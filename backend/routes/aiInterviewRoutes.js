const express = require("express");
const router = express.Router();
const { startInterview, interviewChat } = require("../controllers/aiInterviewController");
const { protect } = require("../middleware/authMiddleware");

router.post("/start", protect, startInterview);
router.post("/chat", protect, interviewChat);

module.exports = router;
