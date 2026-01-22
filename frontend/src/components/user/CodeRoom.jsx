import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CodeRoom = () => {
  const [mode, setMode] = useState("");
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
  if (!roomId || !password) {
    alert("Room ID & Password required");
    return;
  }

  localStorage.setItem("roomPassword", password);
  navigate(`/code-room/${roomId}`);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold text-center mb-4">
          Code Room
        </h2>

        {!mode && (
          <div className="space-y-3">
            <button
              className="w-full bg-green-600 text-white py-2 rounded"
              onClick={() => setMode("create")}
            >
              ➕ Create Room
            </button>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded"
              onClick={() => setMode("join")}
            >
              🔑 Join Room
            </button>
          </div>
        )}

        {mode && (
          <>
            <input
              placeholder="Room ID"
              className="w-full border p-2 mt-4 mb-3"
              onChange={(e) => setRoomId(e.target.value)}
            />

            <input
              type="password"
              placeholder="Room Password"
              className="w-full border p-2 mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2 rounded"
            >
              {mode === "create" ? "Create & Enter" : "Join Room"}
            </button>

            <button
              onClick={() => setMode("")}
              className="w-full mt-2 text-sm underline"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CodeRoom;
