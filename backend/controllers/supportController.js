const SupportMessage = require("../models/SupportMessage");

exports.getSupportHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await SupportMessage.find({ supportUserId: userId })
            .sort({ createdAt: 1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminUserHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await SupportMessage.find({ supportUserId: userId })
            .sort({ createdAt: 1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSupportChats = async (req, res) => {
    try {
        // Get unique users who have sent support messages
        const activeChats = await SupportMessage.aggregate([
            {
                $group: {
                    _id: "$supportUserId",
                    lastMessage: { $last: "$message" },
                    lastUpdate: { $last: "$createdAt" },
                    senderName: { $last: "$senderName" },
                    role: { $last: "$role" }
                }
            },
            { $sort: { lastUpdate: -1 } }
        ]);
        res.status(200).json(activeChats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
