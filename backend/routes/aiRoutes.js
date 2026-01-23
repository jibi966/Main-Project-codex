const express = require("express");
const router = express.Router();
const { reviewCode } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/review", protect, reviewCode);

module.exports = router;
