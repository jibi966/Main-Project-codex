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
 * User side – only show approved courses
 */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: true })
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
 * UPDATE COURSE (TUTOR)
 * ================================
 */
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let course = await Course.findById(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check ownership
    if (course.tutor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    // Update and reset approval status
    course = await Course.findByIdAndUpdate(
      id,
      { ...req.body, isApproved: false, status: "pending" },
      { new: true }
    );

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * DELETE COURSE (TUTOR)
 * ================================
 */
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check ownership
    if (course.tutor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await Course.findByIdAndDelete(id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * ADMIN: GET PENDING COURSES
 * ================================
 */
exports.getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "pending" })
      .populate("tutor", "name email qualification");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * ADMIN: APPROVE/REJECT COURSE
 * ================================
 */
exports.approveRejectCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const isApproved = status === "approved";
    const course = await Course.findByIdAndUpdate(
      id,
      { status, isApproved },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
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

    // Only allow if approved or if the requester is the tutor of the course or an admin
    if (!course.isApproved && req.user?.id !== course.tutor?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: "Course is not yet approved" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
