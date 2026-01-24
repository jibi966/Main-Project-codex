const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createResume,
    getAllResumes,
    getSingleResume,
    updateResume,
} = require("../controllers/resumeController");

router.post("/", protect, createResume);
router.get("/user", protect, getAllResumes);
router.get("/:id", protect, getSingleResume);
router.put("/:id", protect, updateResume);

module.exports = router;
