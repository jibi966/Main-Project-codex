const express = require("express");
const router = express.Router();

const { createLiveClass, getUpcomingLiveClasses } = require("../controllers/liveClassController");
const { protect, tutorOnly } = require("../middleware/authMiddleware");

router.post("/create", protect, tutorOnly, createLiveClass);
router.get("/upcoming", protect, getUpcomingLiveClasses);

module.exports = router;
