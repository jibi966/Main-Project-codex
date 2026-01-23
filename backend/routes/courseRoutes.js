const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getMyCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPendingCourses,
  approveRejectCourse,
} = require("../controllers/courseController");

const { protect, tutorOnly, adminOnly } = require("../middleware/authMiddleware");

// Tutor creates course
router.post("/", protect, tutorOnly, createCourse);

// Tutor sees own courses
router.get("/my", protect, tutorOnly, getMyCourses);

// Tutor updates/deletes own course
router.put("/:id", protect, tutorOnly, updateCourse);
router.delete("/:id", protect, tutorOnly, deleteCourse);

// Admin: Approval dashboard routes
router.get("/pending", protect, adminOnly, getPendingCourses);
router.patch("/:id/approve", protect, adminOnly, approveRejectCourse);

// User sees all courses (approved only)
router.get("/", getAllCourses);

// Single course
router.get("/:id", protect, getCourseById);

module.exports = router;
