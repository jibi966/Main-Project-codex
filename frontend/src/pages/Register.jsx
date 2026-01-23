import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { User, Mail, Lock, UserCheck, Sparkles, ChevronRight, AlertCircle } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Registration successful! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-xl relative z-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl mb-6 shadow-2xl">
            <UserCheck className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase italic tracking-widest">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Identity</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Join the next generation of AI-assisted developers.</p>
        </header>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8"
        >
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Platform Role</label>
              <div className="relative group">
                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors pointer-events-none" />
                <select
                  name="role"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white appearance-none font-medium cursor-pointer"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="user" className="bg-slate-900">Student Learner</option>
                  <option value="tutor" className="bg-slate-900">Expert Instructor</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative py-5 bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                AUTHENTICATE & JOIN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 font-medium tracking-wide">
            Already verified?{" "}
            <Link to="/login" className="text-purple-400 font-black hover:text-purple-300 transition-colors ml-1 uppercase tracking-tighter">
              ACCESS PORTAL
            </Link>
          </p>
        </form>

        <div className="mt-12 flex justify-center gap-6 opacity-30">
          <Sparkles className="w-4 h-4 text-slate-400" />
          <div className="h-4 w-px bg-slate-800"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Decentralized Auth Protocol</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
