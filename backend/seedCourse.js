const mongoose = require("mongoose");
const Course = require("./models/Courses");
const User = require("./models/User");
require("dotenv").config();

const seedCourse = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Find a tutor to assign the course to
        const tutor = await User.findOne({ role: "tutor" });
        if (!tutor) {
            console.log("No tutor found. Please create a tutor account first.");
            process.exit();
        }

        const courseData = {
            title: "Mastering React & Node.js",
            description: "A comprehensive journey from frontend basics to advanced backend architecture. Build a full-stack platform from scratch.",
            price: 4999,
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070",
            tutor: tutor._id,
            modules: [
                {
                    title: "Introduction to Fullstack",
                    lessons: [
                        {
                            title: "What is MERN?",
                            videoUrl: "https://www.youtube.com/embed/SccSCuHhOw0",
                            textContent: "In this lesson, we explore the MongoDB, Express, React, and Node.js stack. We'll discuss why it's so popular and what we'll build in this course.",
                            initialCode: "// List the 4 components of MERN\nconst stack = [];"
                        },
                        {
                            title: "Setting up your Dev Environment",
                            videoUrl: "https://www.youtube.com/embed/mS6S49O7G7Y",
                            textContent: "Installation of Node.js, VS Code, and MongoDB. We also initialize our first project.",
                            initialCode: "console.log('Environment Ready!');"
                        }
                    ]
                },
                {
                    title: "Backend Mastery",
                    lessons: [
                        {
                            title: "Express Middleware",
                            videoUrl: "https://www.youtube.com/embed/lY6icfhap2o",
                            textContent: "Learn how to use middleware to handle requests, logging, and security in Express.",
                            initialCode: "const express = require('express');\nconst app = express();\n\n// Add a logger middleware here"
                        }
                    ]
                }
            ]
        };

        await Course.deleteMany({ title: courseData.title });
        await Course.create(courseData);

        console.log("Course seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedCourse();
