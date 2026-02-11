const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meetingLink: {
      type: String,
      required: true,
    },
    schedule: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "ended"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);
