const Course = require("../models/Courses");

/**
 * ================================
 * CREATE COURSE (TUTOR)
 * ================================
 * POST /api/courses
 * Tutor only
 */
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      tutor: req.user.id, // 🔥 logged-in tutor id from JWT
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * GET ALL COURSES (USER)
 * ================================
 * GET /api/courses
 * User side – show tutor name & qualification
 */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("tutor", "name qualification experience");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * GET TUTOR'S COURSES
 * ================================
 * GET /api/courses/my
 * Tutor only
 */
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ tutor: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * GET SINGLE COURSE (OPTIONAL)
 * ================================
 * GET /api/courses/:id
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("tutor", "name qualification experience");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
