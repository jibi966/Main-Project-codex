const { GoogleGenerativeAI } = require("@google/generative-ai");

const getAIModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash-latest which points to the most current stable snapshot
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
};

// Start a new mock interview session
exports.startInterview = async (req, res) => {
    try {
        console.log("DEBUG: Initializing Interview setup...");
        const model = getAIModel();
        if (!model) {
            console.error("DEBUG ERR: GEMINI_API_KEY is missing or invalid in .env");
            return res.status(500).json({ message: "AI API Key is not configured." });
        }

        const { jobTitle, difficulty } = req.body;
        console.log(`DEBUG: Starting interview for ${jobTitle} (${difficulty})`);

        const prompt = `
            You are a senior technical recruiter for ${jobTitle || "Full Stack Developer"}.
            Difficulty level: ${difficulty || "Medium"}.
            Start a mock technical interview.
            Introduce yourself and ask the first behavioral or technical question to the candidate.
            Keep it professional and realistic.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("DEBUG: Interview started successfully. Content generated.");
        res.status(200).json({
            message: text,
            sessionId: Date.now().toString() // Simple session ID for now
        });
    } catch (error) {
        console.error("DEBUG ERR in startInterview:", error);
        res.status(500).json({
            message: "AI Interview initialization failed. Please try again later.",
            error: error.message
        });
    }
};

// Chat during the interview
exports.interviewChat = async (req, res) => {
    try {
        const model = getAIModel();
        if (!model) return res.status(500).json({ message: "AI is not configured." });

        const { message, history, jobTitle } = req.body;
        console.log(`DEBUG: Interview message received: ${message}`);

        const chat = model.startChat({
            history: history || [],
            generationConfig: { maxOutputTokens: 500 },
        });

        const prompt = message || "I'm ready for the next question.";
        const result = await chat.sendMessage(prompt);
        const response = await result.response;

        res.status(200).json({
            message: response.text()
        });
    } catch (error) {
        console.error("DEBUG ERR in interviewChat:", error);
        res.status(500).json({
            message: "AI failed to process your message. Please check your connection.",
            error: error.message
        });
    }
};


