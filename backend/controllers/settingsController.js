const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
exports.getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("settings socials name email photo bio specialization experience qualification");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user settings
// @route   PUT /api/settings
// @access  Private
exports.updateSettings = async (req, res) => {
    try {
        const { settings, socials, name, bio, specialization, experience, qualification } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update basic info
        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (specialization !== undefined) user.specialization = specialization;
        if (experience !== undefined) user.experience = experience;
        if (qualification !== undefined) user.qualification = qualification;

        // Update settings object
        if (settings) {
            user.settings = { ...user.settings, ...settings };
        }

        // Update socials object
        if (socials) {
            user.socials = { ...user.socials, ...socials };
        }

        await user.save();
        res.status(200).json({ message: "Settings updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user password
// @route   PUT /api/settings/password
// @access  Private
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid current password" });
        }

        user.password = newPassword; // Pre-save hook will hash it
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
