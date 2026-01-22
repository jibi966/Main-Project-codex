import { useState } from "react";

const PracticeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  const handleRun = () => {
    // Temporary mock output
    setOutput("Code executed successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-400">
          Practice Code Editor
        </h2>
        <button
          onClick={handleRun}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
        >
          Run Code
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
        className="w-full h-[65vh] bg-gray-800 p-4 rounded font-mono text-sm outline-none resize-none"
      />

      {/* Output */}
      <div className="mt-4 bg-black p-3 rounded">
        <h3 className="text-sm text-gray-400 mb-1">Output:</h3>
        <pre className="text-green-400 text-sm">{output}</pre>
      </div>
    </div>
  );
};

export default PracticeEditor;
