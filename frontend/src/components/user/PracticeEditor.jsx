import React, { useState } from "react";
import api from "../../services/api";
import Navbar from "../common/Navbar";
import { Play, Sparkles, Terminal, RefreshCw, AlertCircle, X, ChevronRight } from "lucide-react";

const PracticeEditor = () => {
  const [code, setCode] = useState("// Write your algorithmic code here...\n\nfunction solution() {\n  // your logic\n}");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiReview, setAiReview] = useState("");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await api.post("/compile/run", { code, language: "javascript" });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error executing code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiReview = async () => {
    setReviewLoading(true);
    setShowAiPanel(true);
    setAiReview("");
    try {
      const res = await api.post("/api/ai/review", { code, language: "javascript" });
      setAiReview(res.data.review);
    } catch (error) {
      setAiReview("AI Review failed. Make sure your mentor is online!");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="text-blue-500 w-6 h-6" />
              Practice <span className="text-blue-400">Editor</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Master your logic with real-time feedback</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAiReview}
              className="group flex items-center gap-2 px-5 py-2.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 font-semibold rounded-xl hover:bg-purple-600/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              AI Code Mentor
            </button>
            <button
              onClick={handleRun}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Run Code
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Editor Section */}
          <div className={`transition-all duration-300 ${showAiPanel ? "lg:col-span-8" : "lg:col-span-12"} bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl`}>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-xs font-mono text-slate-500">solution.js</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full h-[65vh] bg-slate-900/30 p-6 font-mono text-sm outline-none resize-none leading-relaxed text-slate-300"
            />

            {/* Output Panel */}
            <div className="bg-slate-900 border-t border-slate-700/50 p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Output Console
              </h3>
              <div className="min-h-[100px] font-mono text-sm whitespace-pre-wrap">
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-500">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Initializing execution...
                  </div>
                ) : output ? (
                  <div className={output.includes("Error") ? "text-red-400" : "text-emerald-400"}>
                    {output}
                  </div>
                ) : (
                  <span className="text-slate-600 italic">No output yet. Click 'Run Code' to see results.</span>
                )}
              </div>
            </div>
          </div>

          {/* AI Mentor Panel */}
          {showAiPanel && (
            <div className="lg:col-span-4 bg-slate-800/50 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full animate-in slide-in-from-right-4">
              <div className="p-4 bg-purple-600/10 border-b border-purple-500/20 flex justify-between items-center text-purple-400 font-bold">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> AI Mentor Feedback
                </span>
                <button onClick={() => setShowAiPanel(false)} className="hover:bg-purple-600/20 p-1 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
                {reviewLoading ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-700/50 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-slate-700/50 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-slate-700/50 rounded animate-pulse w-5/6"></div>
                    <div className="h-32 bg-slate-700/50 rounded animate-pulse w-full mt-8"></div>
                    <p className="text-sm text-center text-slate-500 mt-4">Analyzing code patterns...</p>
                  </div>
                ) : aiReview ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-purple-400 prose-strong:text-white prose-code:text-emerald-400">
                    <div className="whitespace-pre-wrap break-words text-slate-300 leading-relaxed font-sans">
                      {aiReview}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 text-blue-100/70">AI suggestions are here to guide you. Try implementing the feedback to improve your logic!</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PracticeEditor;
