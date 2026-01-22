const express = require("express");
const axios = require("axios");
const router = express.Router();

const LANGUAGE_MAP = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

router.post("/run", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ output: "Code or language missing" });
  }

  const languageId = LANGUAGE_MAP[language];
  if (!languageId) {
    return res.status(400).json({ output: "Unsupported language" });
  }

  try {
    // 1️⃣ Create submission
    const submitRes = await axios.post(
      "https://ce.judge0.com/submissions?wait=true",
      {
        source_code: code,
        language_id: languageId,
        stdin: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = submitRes.data;

    const output =
      data.stdout ||
      data.stderr ||
      data.compile_output ||
      data.message ||
      data.status?.description ||
      "No output";

    res.json({ output });
  } catch (error) {
    console.error("Judge0 Error:", error.message);
    res.status(500).json({ output: "Execution failed" });
  }
});

module.exports = router;
