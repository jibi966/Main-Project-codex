import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Code, BookOpen, Video, Terminal, ArrowRight,
  Zap, Users, Globe, Award, Trophy, Star,
  MessageSquare, ChevronRight, Sparkles, Layout
} from "lucide-react";
import api from "../../services/api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({ xp: 0, level: 1, badges: [] });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const savedName = localStorage.getItem("name");
    if (savedName) setUserName(savedName);

    const fetchStats = async () => {
      try {
        const res = await api.get("/user/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-44 overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 left-[5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className={`lg:col-span-7 space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-slate-300 text-sm font-bold animate-fade-in-down">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="uppercase tracking-[0.2em] text-[10px]">Welcome back, Commander</span>
              <div className="h-4 w-px bg-slate-700 mx-1"></div>
              <span className="text-blue-400">{userName}</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient-text">
                Beyond
              </span>
              <br /> Limits.
            </h1>

            <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
              You are currently Level {stats.level}. Push your boundaries with AI-assisted training, high-stakes challenges, and global collaboration.
            </p>

            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => navigate("/code-room")}
                className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-3">
                  INITIATE WORKSPACE <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => navigate("/user/courses")}
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                ACADEMY CATALOG <BookOpen className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Level Stats Bar */}
            <div className="pt-6 animate-reveal">
              <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">XP PROGRESSION</span>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-black">{stats.xp} <span className="text-sm text-slate-500">/ {(stats.level * 100)}</span></span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 tracking-tighter uppercase">
                  LEVEL {stats.level} OVERSEER
                </div>
              </div>
              <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 relative"
                  style={{ width: `${Math.min((stats.xp / (stats.level * 100)) * 100, 100)}%` }}
                >
                  <div className="absolute top-0 right-0 w-4 h-full bg-white/20 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 relative group perspective-1000 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Ultra-Modern Code Box */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-slate-950/80 border border-slate-800/50 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.6)] transform transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-6">
              <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex items-center gap-3 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <Terminal className="w-3 h-3" /> main.terminal
                </div>
              </div>

              <div className="space-y-4 font-mono text-[13px] leading-relaxed">
                <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-500">
                  <span className="text-slate-700 shrink-0">01</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500 italic">instance</span>
                    <span className="text-blue-400">Environment</span>
                    <span className="text-slate-500">=</span>
                    <span className="text-emerald-400">new</span>
                    <span className="text-yellow-400">NeuralLink</span>()
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-500 delay-100">
                  <span className="text-slate-700 shrink-0">02</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">let</span>
                    <span className="text-blue-400">potential</span>
                    <span className="text-slate-500">=</span>
                    <span className="text-pink-500">Infinity</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-500 delay-200">
                  <span className="text-slate-700 shrink-0">03</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-shadow-glow">Environment</span>.<span className="text-yellow-400">unlock</span>(potential)
                  </div>
                </div>
                <div className="flex items-start gap-4 opacity-50 animate-in slide-in-from-left-4 duration-500 delay-300">
                  <span className="text-slate-700 shrink-0">04</span>
                  <div className="flex items-center gap-2 italic text-slate-600">
                           // Initializing elite protocols...
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <div className="w-2 h-4 bg-blue-500 animate-pulse"></div>
                </div>
              </div>

              {/* Floating Activity Status */}
              <div className="absolute -right-8 bottom-12 p-6 bg-slate-900/90 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:-translate-x-4 flex items-center gap-6 animate-reveal delay-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold shadow-xl`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold shadow-xl">
                    +12
                  </div>
                </div>
                <div>
                  <div className="text-xs font-black">ACTIVE NOW</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Collaborating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tool Grid */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className={`flex justify-between items-end mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-4 uppercase italic">
                Operations <span className="text-slate-500">Manifesto</span>
              </h2>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                High-performance modules built for modern engineering requirements.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors cursor-help">
                <Layout className="w-5 h-5" />
              </div>
              <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8 text-blue-400" />}
              title="Code Room"
              desc="Real-time collaborative tactical engineering environment."
              onClick={() => navigate("/code-room")}
              gradient="from-blue-500/10 to-transparent"
              highlight="border-blue-500/20"
              index={0}
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-purple-400" />}
              title="Academy"
              desc="Deep technical tracks curated by elite industry mentors."
              onClick={() => navigate("/user/courses")}
              gradient="from-purple-500/10 to-transparent"
              highlight="border-purple-500/20"
              index={1}
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-pink-500" />}
              title="AI Recruiter"
              desc="Advanced LLM-driven battle testing for high-stakes interviews."
              onClick={() => navigate("/user/mock-interview")}
              gradient="from-pink-500/10 to-transparent"
              highlight="border-pink-500/20"
              index={2}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-500" />}
              title="Challenges"
              desc="High-frequency algorithmic puzzles to maximize peak performance."
              onClick={() => navigate("/user/challenges")}
              gradient="from-yellow-500/10 to-transparent"
              highlight="border-yellow-500/20"
              index={3}
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-emerald-500" />}
              title="Rankings"
              desc="Global status tracking for the top 0.1% percent of talent."
              onClick={() => navigate("/user/leaderboard")}
              gradient="from-emerald-500/10 to-transparent"
              highlight="border-emerald-500/20"
              index={4}
            />
            <FeatureCard
              icon={<Video className="w-8 h-8 text-red-500" />}
              title="Live Ops"
              desc="Real-time masterclasses with zero-latency collaborative coding."
              onClick={() => navigate("/user/live-classes")}
              gradient="from-red-500/10 to-transparent"
              highlight="border-red-500/20"
              index={5}
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-cyan-400" />}
              title="Sandbox"
              desc="Isolated environment for testing complex architectural patterns."
              onClick={() => navigate("/user/practice-editor")}
              gradient="from-cyan-500/10 to-transparent"
              highlight="border-cyan-500/20"
              index={6}
            />
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-slate-800 bg-slate-900/10 opacity-30 cursor-not-allowed">
              <Layout className="w-10 h-10 mb-4 text-slate-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Sector [Locked]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Footer Lite */}
      <footer className="py-20 border-t border-slate-900 mx-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-8">
            <StatusItem icon={<Users className="w-4 h-4" />} text="12.4k Active" />
            <StatusItem icon={<Globe className="w-4 h-4" />} text="Global Node" />
          </div>
          <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] animate-pulse">
            System Core v4.0.0_Elite_Motion
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }

        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 5s linear infinite;
        }

        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(12deg); }
        .rotate-x-6 { transform: rotateX(6deg); }
      `}} />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, onClick, gradient, highlight, index }) => (
  <div
    onClick={onClick}
    style={{ animationDelay: `${index * 100}ms` }}
    className={`group relative p-10 rounded-[2rem] bg-gradient-to-br ${gradient} border ${highlight} backdrop-blur-md cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden animate-reveal opacity-0`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
      {React.cloneElement(icon, { className: "w-32 h-32 rotate-12 transition-transform duration-700 group-hover:rotate-45" })}
    </div>

    <div className="relative z-10">
      <div className="mb-8 p-4 rounded-2xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-110 group-hover:bg-slate-900 group-hover:border-slate-700 transition-all duration-500 shadow-xl">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter transition-colors group-hover:text-blue-400">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {desc}
      </p>
    </div>

    <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-white transition-all duration-500">
      Launch Module <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
    </div>
  </div>
);

const StatusItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-600 group transition-colors hover:text-white">
    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 transition-all group-hover:border-blue-500/50">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{text}</span>
  </div>
);

export default UserDashboard;
