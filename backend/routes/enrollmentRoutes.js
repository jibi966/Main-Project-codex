const express = require("express");
const router = express.Router();
const {
    purchaseCourse,
    getMyEnrolledCourses,
    checkEnrollment,
} = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/purchase", protect, purchaseCourse);
router.get("/my", protect, getMyEnrolledCourses);
router.get("/check/:courseId", protect, checkEnrollment);

module.exports = router;
