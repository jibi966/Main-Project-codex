const Challenge = require("../models/Challenge");
const User = require("../models/User");
const axios = require("axios");

const LANGUAGE_MAP = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
};

// Helper: Calculate XP needed for next level
const getXPForLevel = (level) => level * 100;

exports.getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find().select("-testCases");
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitChallenge = async (req, res) => {
    try {
        const { challengeId, code, language } = req.body;
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        const languageId = LANGUAGE_MAP[language];
        if (!languageId) return res.status(400).json({ message: "Unsupported language" });

        const results = [];
        let allPassed = true;

        for (const testCase of challenge.testCases) {
            const submitRes = await axios.post(
                "https://ce.judge0.com/submissions?wait=true",
                {
                    source_code: code,
                    language_id: languageId,
                    stdin: testCase.input,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const actualOutput = (submitRes.data.stdout || "").trim();
            const expectedOutput = (testCase.expectedOutput || "").trim();
            const passed = actualOutput === expectedOutput;

            if (!passed) allPassed = false;

            results.push({
                input: testCase.input,
                expected: expectedOutput,
                actual: actualOutput,
                passed,
                status: submitRes.data.status?.description,
            });
        }

        let xpAwarded = 0;
        let leveledUp = false;

        if (allPassed) {
            xpAwarded = 50; // Standard XP for success
            const user = await User.findById(req.user._id);
            if (user) {
                user.xp += xpAwarded;

                // Check level up
                if (user.xp >= getXPForLevel(user.level)) {
                    user.xp -= getXPForLevel(user.level);
                    user.level += 1;
                    leveledUp = true;
                }
                await user.save();
            }
        }

        res.json({
            allPassed,
            results,
            xpAwarded,
            leveledUp
        });
    } catch (error) {
        console.error("Submission Error:", error.message);
        res.status(500).json({ message: "Challenge submission failed" });
    }
};
