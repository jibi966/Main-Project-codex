const { GoogleGenerativeAI } = require("@google/generative-ai");

const getAIModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-flash-latest which is confirmed to be supported
    return genAI.getGenerativeModel({ model: "gemini-flash-latest" });
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

        // Gemini requires history to start with a 'user' role.
        // Since our flow starts with the model's intro, we prepend a dummy user intent.
        let chatHistory = history || [];
        if (chatHistory.length > 0 && chatHistory[0].role === "model") {
            chatHistory = [
                { role: "user", parts: [{ text: "I am ready for my mock interview. Please begin." }] },
                ...chatHistory
            ];
        }

        const chat = model.startChat({
            history: chatHistory,
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
        console.error("DEBUG ERR Stack:", error.stack);
        console.error("DEBUG ERR Message Body:", req.body);
        res.status(500).json({
            message: "AI failed to process your message. Please check your connection.",
            error: error.message
        });
    }
};


