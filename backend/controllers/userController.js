const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({ role: "user" })
      .select("name xp level badges")
      .sort({ level: -1, xp: -1 })
      .limit(10);
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getXPStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("xp level badges");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
