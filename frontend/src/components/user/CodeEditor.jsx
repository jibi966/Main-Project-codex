import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import socket from "../../socket";
import api from "../../services/api";

const CodeEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const password = localStorage.getItem("roomPassword");
  const role = localStorage.getItem("role") || "User";

  const [code, setCode] = useState("// Start coding here...\n");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [status, setStatus] = useState("Connecting...");

  // 💬 Chat state
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (!password) {
      navigate("/code-room");
      return;
    }

    // 🔐 Room error
    socket.on("room-error", (msg) => {
      alert(msg);
      localStorage.removeItem("roomPassword");
      navigate("/code-room");
    });

    socket.on("joined", () => {
      setStatus("Connected");
    });

    // 🔁 Code sync
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    // 💬 Receive chat
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.emit("join-room", { roomId, password });

    return () => {
      socket.off("room-error");
      socket.off("joined");
      socket.off("receive-code");
      socket.off("receive-message");
    };
  }, [roomId, password, navigate]);

  // ✍️ Code change
  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit("code-change", { roomId, code: value });
  };

  // ▶ RUN CODE
  const runCode = async () => {
    setOutput("Running...");

    try {
      const res = await api.post("/compile/run", {
        code,
        language,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error while running code");
    }
  };

  // 💬 Send chat
  const sendMessage = () => {
    if (!chatInput.trim()) return;

    socket.emit("send-message", {
      roomId,
      message: chatInput,
      sender: role,
    });

    setChatInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div>
          <h2 className="font-bold text-lg">💻 Code Room</h2>
          <p className="text-sm text-gray-400">Room ID: {roomId}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <button
            onClick={runCode}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
          >
            ▶ Run
          </button>

          <span className="bg-green-700 px-3 py-1 rounded text-sm">
            {status}
          </span>
        </div>
      </div>

      {/* 🔽 MAIN CONTENT */}
      <div className="flex flex-1">
        {/* 🧠 EDITOR */}
        <div className="w-2/3 flex flex-col">
          <Editor
            height="70%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
          />

          {/* OUTPUT */}
          <div className="h-1/3 bg-black p-3 text-green-400 text-sm overflow-auto">
            <h3 className="font-bold mb-1">Output</h3>
            <pre>{output}</pre>
          </div>
        </div>

        {/* 💬 CHAT */}
        <div className="w-1/3 bg-gray-800 flex flex-col border-l border-gray-700">
          <div className="p-3 font-bold border-b border-gray-700">
            💬 Chat
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold">{msg.sender}</span>
                <span className="text-xs text-gray-400">
                  {" "}
                  ({msg.time})
                </span>
                <div>{msg.message}</div>
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-gray-700 px-2 py-1 rounded"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
