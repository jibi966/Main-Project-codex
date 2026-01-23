const mongoose = require("mongoose");
const Challenge = require("./models/Challenge");
require("dotenv").config();

const challenges = [
    {
        title: "Sum of Two Numbers",
        description: "Write a function that takes two numbers as input and returns their sum.",
        difficulty: "Easy",
        baseCode: "function sum(a, b) {\n  // Write your code here\n}",
        testCases: [
            { input: "1 2", expectedOutput: "3" },
            { input: "10 20", expectedOutput: "30" },
        ],
    },
    {
        title: "Reverse a String",
        description: "Write a function that reverses the given string.",
        difficulty: "Medium",
        baseCode: "function reverseString(str) {\n  // Write your code here\n}",
        testCases: [
            { input: "hello", expectedOutput: "olleh" },
            { input: "world", expectedOutput: "dlrow" },
        ],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Challenge.deleteMany({});
        await Challenge.insertMany(challenges);
        console.log("Challenges seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDB();
