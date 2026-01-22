exports.createLiveClass = async (req, res) => {
  try {
    const { title, meetLink, date } = req.body;

    if (!title || !meetLink || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    res.status(201).json({
      message: "Live class scheduled successfully",
      liveClass: {
        title,
        meetLink,
        date,
        tutor: req.user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
