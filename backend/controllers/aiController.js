const { GoogleGenerativeAI } = require("@google/generative-ai");

// Helper to handle AI Mentor initialization safely
const getAIModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
};

exports.reviewCode = async (req, res) => {
    try {
        const model = getAIModel();
        if (!model) {
            return res.status(500).json({
                message: "AI Mentor is not configured. Please add a valid GEMINI_API_KEY to your backend/.env file."
            });
        }

        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }

        const prompt = `
      You are an expert ${language || "programming"} mentor. 
      Review the following code and provide constructive feedback.
      Focus on:
      1. Potential bugs or errors.
      2. Performance improvements.
      3. Best practices and readability.
      
      Format your response in simple markdown.
      
      Code:
      \`\`\`${language || ""}
      ${code}
      \`\`\`
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ review: text });
    } catch (error) {
        console.error("Gemini AI Error:", error.message);
        res.status(500).json({ message: "AI review failed. Please check your API key and connection." });
    }
};
