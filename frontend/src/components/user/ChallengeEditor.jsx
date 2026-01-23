import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Navbar from "../common/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Sparkles, Terminal, ChevronLeft, CheckCircle, XCircle, Clock, Award } from "lucide-react";

const ChallengeEditor = () => {
    const { challengeId } = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const res = await api.get(`/challenges/${challengeId}`);
                setChallenge(res.data);
                setCode(res.data.baseCode || "// Write your solution here...");
            } catch (error) {
                console.error("Error fetching challenge:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChallenge();
    }, [challengeId]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setResults(null);
        try {
            const res = await api.post("/challenges/submit", {
                challengeId,
                code,
                language: "javascript"
            });
            setResults(res.data);
        } catch (error) {
            alert("Submission failed. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 overflow-hidden grid lg:grid-cols-12">
                {/* Left: Problem Statement */}
                <div className="lg:col-span-4 border-r border-slate-800 p-8 overflow-y-auto custom-scrollbar">
                    <button
                        onClick={() => navigate("/user/challenges")}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Challenges
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Award className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Challenge</span>
                    </div>

                    <h1 className="text-3xl font-extrabold mb-6 tracking-tight">{challenge.title}</h1>

                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed mb-8">
                        <p className="whitespace-pre-wrap">{challenge.description}</p>
                    </div>

                    {/* Points/Difficulty */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                            <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Difficulty</span>
                            <span className="font-bold text-blue-400">{challenge.difficulty}</span>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                            <span className="block text-xs text-slate-500 uppercase font-bold mb-1">XP Points</span>
                            <span className="font-bold text-yellow-500">+50 XP</span>
                        </div>
                    </div>

                    {results && (
                        <div className={`p-6 rounded-2xl border ${results.allPassed ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"} animate-in zoom-in-95`}>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className={`text-lg font-bold flex items-center gap-2 ${results.allPassed ? "text-emerald-400" : "text-red-400"}`}>
                                    {results.allPassed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                    {results.allPassed ? "All Tests Passed!" : "Compilation Failed"}
                                </h4>
                                <span className="text-xs font-mono opacity-50">Score: {results.allPassed ? "100/100" : "0/100"}</span>
                            </div>

                            <div className="space-y-3">
                                {results.results.map((res, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm p-3 bg-slate-900/50 rounded-xl">
                                        <span className="text-slate-400">Test Case {i + 1}</span>
                                        <span className={res.passed ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                                            {res.passed ? "Passed" : "Failed"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Code Editor & Submission */}
                <div className="lg:col-span-8 flex flex-col bg-slate-900">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800/30 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-slate-700">
                                <Terminal className="w-3 h-3" /> main.js
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {submitting ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                            Submit Solution
                        </button>
                    </div>

                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                        className="flex-1 w-full bg-slate-900/50 p-8 font-mono text-sm outline-none resize-none leading-relaxed text-slate-300 custom-scrollbar"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChallengeEditor;
