const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getMyCourses,
  getCourseById,
} = require("../controllers/courseController");

const { protect, tutorOnly } = require("../middleware/authMiddleware");

// Tutor creates course
router.post("/", protect, tutorOnly, createCourse);

// Tutor sees own courses
router.get("/my", protect, tutorOnly, getMyCourses);

// User sees all courses
router.get("/", getAllCourses);

// Single course
router.get("/:id", getCourseById);

module.exports = router;
