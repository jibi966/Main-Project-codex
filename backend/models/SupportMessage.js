const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        senderName: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "tutor", "admin"],
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        // The support room is usually specific to the user who needs support.
        // For simplicity, we'll store the userId this conversation belongs to.
        supportUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("SupportMessage", supportMessageSchema);
