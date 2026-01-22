import { useState } from "react";
import api from "../../services/api";

const ScheduleLiveClass = () => {
  const [form, setForm] = useState({
    meetingLink: "",
    schedule: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/live-classes", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Live class scheduled");
    } catch {
      alert("Failed to create live class");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-600">
        Schedule Live Class
      </h2>

      <input
        name="meetingLink"
        placeholder="Google Meet / Zoom Link"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="schedule"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Create Live Class
      </button>
    </div>
  );
};

export default ScheduleLiveClass;
