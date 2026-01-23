const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔗 link to tutor
      required: true,
    },
    modules: [
      {
        title: { type: String, required: true },
        lessons: [
          {
            title: { type: String, required: true },
            videoUrl: { type: String },
            textContent: { type: String },
            initialCode: { type: String, default: "// Start coding here..." },
          },
        ],
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
