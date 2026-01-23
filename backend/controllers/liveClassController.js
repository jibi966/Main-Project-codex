const LiveClass = require("../models/LiveClass");

exports.createLiveClass = async (req, res) => {
  try {
    const { title, meetingLink, schedule, courseId } = req.body;

    if (!title || !meetingLink || !schedule) {
      return res.status(400).json({ message: "Title, meeting link, and schedule are required" });
    }

    const liveClass = await LiveClass.create({
      title,
      meetingLink,
      schedule,
      course: courseId,
      tutor: req.user._id,
    });

    res.status(201).json({
      message: "Live class scheduled successfully",
      liveClass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUpcomingLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find({
      schedule: { $gte: new Date() },
    })
      .populate("tutor", "name email")
      .populate("course", "title")
      .sort({ schedule: 1 });

    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
