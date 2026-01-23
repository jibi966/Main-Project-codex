import React from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import { Code, BookOpen, Video, Terminal, ArrowRight, Zap, Users, Globe } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Hello, {localStorage.getItem("name") || "Student"}!
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Master Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Build Future.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Join a community of developers. Practice coding in real-time, attend live masterclasses, and collaborate with peers to level up your skills.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/code-room")}
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Coding Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => navigate("/user/courses")}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Explore Courses
              </button>
            </div>

            <div className="flex items-center gap-6 text-slate-500 text-sm font-medium pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>10k+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Global Community</span>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3 font-mono text-sm text-slate-300">
                <div className="flex">
                  <span className="text-purple-400 mr-2">const</span>
                  <span className="text-blue-400">developer</span>
                  <span className="text-slate-500 ml-2">=</span>
                  <span className="text-yellow-300 ml-2">{"{"}</span>
                </div>
                <div className="pl-6">
                  <span className="text-slate-400">name:</span>
                  <span className="text-green-400 ml-2">"You"</span>,
                </div>
                <div className="pl-6">
                  <span className="text-slate-400">skills:</span>
                  <span className="text-yellow-300 ml-2">["React", "Node", "Magic"]</span>,
                </div>
                <div className="pl-6">
                  <span className="text-slate-400">status:</span>
                  <span className="text-green-400 ml-2">"Ready to Launch"</span>
                </div>
                <div className="text-yellow-300">{"}"}</div>

                <div className="flex pt-4">
                  <span className="text-purple-400 mr-2">await</span>
                  <span className="text-blue-400">startJourney</span>
                  <span className="text-slate-500">()</span>;
                </div>
                <div className="animate-pulse text-blue-500">_</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-20 bg-slate-900/50 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
              Everything you need to excel
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our platform provides a comprehensive suite of tools designed to help you learn faster and code better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Code className="w-8 h-8 text-blue-400" />}
              title="Code Room"
              desc="Real-time collaborative coding environments with voice & video chat support."
              onClick={() => navigate("/code-room")}
              color="bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-purple-400" />}
              title="Courses"
              desc="Structured learning paths curated by industry experts to master new stacks."
              onClick={() => navigate("/user/courses")}
              color="bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50"
            />
            <FeatureCard
              icon={<Video className="w-8 h-8 text-pink-400" />}
              title="Live Classes"
              desc="Interactive live sessions with mentors for deeper understanding and Q&A."
              onClick={() => navigate("/user/live-classes")}
              color="bg-pink-500/10 border-pink-500/20 hover:border-pink-500/50"
            />
            <FeatureCard
              icon={<Terminal className="w-8 h-8 text-emerald-400" />}
              title="Practice Editor"
              desc="Powerful text editor with compiler support for daily algorithmic practice."
              onClick={() => navigate("/user/practice-editor")}
              color="bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc, onClick, color }) => (
  <div
    onClick={onClick}
    className={`group p-8 rounded-2xl border ${color} backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
  >
    <div className="mb-6 p-4 rounded-xl bg-slate-800/50 w-fit group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

export default UserDashboard;
