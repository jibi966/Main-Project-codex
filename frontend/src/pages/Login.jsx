import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { Mail, Lock, LogIn, Sparkles, ChevronRight, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "tutor") navigate("/tutor");
      else navigate("/user");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl mb-6 shadow-2xl">
            <LogIn className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase italic tracking-widest">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Back</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Continue your journey in AI-powered development.</p>
        </header>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6"
        >
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                SIGN IN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 font-medium">
            Don’t have an professional account?{" "}
            <Link to="/register" className="text-blue-400 font-black hover:text-blue-300 transition-colors">
              JOIN THE ELITE
            </Link>
          </p>
        </form>

        <div className="mt-12 flex justify-center gap-6 opacity-30">
          <Sparkles className="w-4 h-4 text-slate-500" />
          <div className="h-4 w-px bg-slate-800"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Secure Access v2.4</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

