const express = require("express");
const router = express.Router();

const { createLiveClass } = require("../controllers/liveClassController");
const { protect, tutorOnly } = require("../middleware/authMiddleware");

router.post("/create", protect, tutorOnly, createLiveClass);

module.exports = router;
