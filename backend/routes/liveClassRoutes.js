const express = require("express");
const router = express.Router();

const { createLiveClass, getUpcomingLiveClasses, endLiveClass, getTutorLiveClasses } = require("../controllers/liveClassController");
const { protect, tutorOnly } = require("../middleware/authMiddleware");

router.post("/create", protect, tutorOnly, createLiveClass);
router.get("/upcoming", protect, getUpcomingLiveClasses);
router.get("/my-sessions", protect, tutorOnly, getTutorLiveClasses);
router.put("/end/:id", protect, tutorOnly, endLiveClass);

module.exports = router;
