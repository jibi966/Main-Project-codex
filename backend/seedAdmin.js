const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminEmail = "admin@example.com";

        // Delete existing admin to fix potential double-hashing
        await User.deleteOne({ email: adminEmail });

        await User.create({
            name: "System Admin",
            email: adminEmail,
            password: "admin123", // Let the model middleware handle hashing
            role: "admin",
            xp: 0,
            level: 1,
            badges: []
        });

        console.log("Admin created successfully!");
        console.log("Email: admin@example.com");
        console.log("Password: admin123");
        process.exit();
    } catch (error) {
        console.error("Admin seeding failed:", error);
        process.exit(1);
    }
};

seedAdmin();
