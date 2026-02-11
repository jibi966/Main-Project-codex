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
    // Show classes that are upcoming OR started within the last 2 hours (ongoing)
    // AND must NOT be ended
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const liveClasses = await LiveClass.find({
      schedule: { $gte: twoHoursAgo },
      status: "scheduled",
    })
      .populate("tutor", "name email")
      .populate("course", "title")
      .sort({ schedule: 1 });

    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.endLiveClass = async (req, res) => {
  try {
    const { id } = req.params;
    const liveClass = await LiveClass.findById(id);

    if (!liveClass) {
      return res.status(404).json({ message: "Live class not found" });
    }

    // Check if the tutor is the owner
    if (liveClass.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to end this class" });
    }

    liveClass.status = "ended";
    await liveClass.save();

    res.status(200).json({ message: "Live class ended and expired" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutorLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find({ tutor: req.user._id })
      .populate("course", "title")
      .sort({ schedule: -1 });

    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
