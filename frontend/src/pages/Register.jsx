import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <input
          name="name"
          autoComplete="off"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          autoComplete="new-email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-2 border rounded mb-4"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="tutor">Tutor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
