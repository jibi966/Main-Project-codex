const Resume = require('../models/Resume');

// Create resume
const createResume = async (req, res) => {
    try {
        const resume = await Resume.create(req.body);
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all resumes for a user
const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.query.userId });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single resume
const getSingleResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createResume,
    getAllResumes,
    getSingleResume,
};