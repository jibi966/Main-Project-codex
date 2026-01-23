import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../common/Navbar";
import Editor from "@monaco-editor/react";
import {
    Play, CheckCircle, ChevronRight, ChevronLeft,
    BookOpen, Terminal, RefreshCw, Layers,
    Video, FileText, Star, Lock
} from "lucide-react";

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${courseId}`);
                setCourse(res.data);
                if (res.data.modules?.[0]?.lessons?.[0]) {
                    const firstLesson = res.data.modules[0].lessons[0];
                    setActiveLesson(firstLesson);
                    setCode(firstLesson.initialCode || "// Start coding here...");
                }
            } catch (err) {
                console.error("Failed to fetch course details");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleLessonSelect = (lesson) => {
        setActiveLesson(lesson);
        setCode(lesson.initialCode || "// Start coding here...");
        setOutput("");
    };

    const runCode = async () => {
        setRunning(true);
        setOutput("");
        try {
            const res = await api.post("/compile/run", {
                code,
                language: "javascript"
            });
            setOutput(res.data.output);
        } catch (err) {
            setOutput("Error: Runtime failure.");
        } finally {
            setRunning(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return <div className="p-20 text-center text-white">Course not found.</div>;

    return (
        <div className="h-screen bg-slate-950 text-white font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Sidebar Navigation */}
                <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Curriculum</h2>
                        <h3 className="font-bold text-lg leading-tight truncate">{course.title}</h3>
                    </div>

                    <div className="flex-1">
                        {course.modules?.map((module, mIdx) => (
                            <div key={mIdx} className="border-b border-slate-800 last:border-0">
                                <div className="px-6 py-4 bg-slate-800/20 font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Layers className="w-3 h-3 text-blue-500" />
                                    Module {mIdx + 1}: {module.title}
                                </div>
                                <div className="py-2">
                                    {module.lessons?.map((lesson, lIdx) => (
                                        <button
                                            key={lIdx}
                                            onClick={() => handleLessonSelect(lesson)}
                                            className={`w-full px-6 py-4 flex items-center gap-3 text-left transition-all hover:bg-slate-800/50 ${activeLesson?.title === lesson.title ? 'bg-blue-600/10 border-l-4 border-blue-500 text-blue-400' : 'text-slate-400'}`}
                                        >
                                            {activeLesson?.title === lesson.title ? <Play className="w-4 h-4 fill-current" /> : <BookOpen className="w-4 h-4 opacity-50" />}
                                            <span className="text-sm font-semibold">{lesson.title}</span>
                                            {/* Mock completion logic */}
                                            <CheckCircle className={`w-4 h-4 ml-auto opacity-20`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* MIDDLE: Content Area */}
                <main className="flex-1 flex flex-col relative bg-slate-900">
                    {/* Header with Title */}
                    <div className="px-8 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                <Video className="w-4 h-4" />
                            </div>
                            <h1 className="font-bold tracking-tight">{activeLesson?.title || "Select a lesson"}</h1>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                            <Star className="w-3 h-3 fill-current" /> Lesson Mode
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {/* Video Player */}
                        <div className="aspect-video bg-black relative group">
                            {activeLesson?.videoUrl ? (
                                <iframe
                                    src={activeLesson.videoUrl}
                                    className="w-full h-full"
                                    title="Lesson Video"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                                    <Video className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="font-bold text-sm">No video available for this lesson</p>
                                </div>
                            )}
                        </div>

                        {/* Lesson Text Content */}
                        <div className="p-10 max-w-4xl prose prose-invert prose-sm">
                            <h2 className="text-2xl font-extrabold mb-6 tracking-tight flex items-center gap-3">
                                <FileText className="w-6 h-6 text-blue-400" /> Lesson Instructions
                            </h2>
                            <div className="text-slate-400 leading-relaxed whitespace-pre-wrap text-base">
                                {activeLesson?.textContent || "Use the code editor on the right to practice what you learn in the video."}
                            </div>
                        </div>
                    </div>
                </main>

                {/* RIGHT: Practice Editor Side-panel */}
                <aside className="w-[45vw] bg-slate-950 border-l border-slate-800 flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Terminal className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm tracking-tight">Interactive Playground</span>
                        </div>
                        <button
                            onClick={runCode}
                            disabled={running}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
                        >
                            {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                            RUN CODE
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            language="javascript"
                            value={code}
                            onChange={(val) => setCode(val)}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 20 },
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                        />
                    </div>

                    {/* Mini Console */}
                    <div className="h-48 bg-slate-950 border-t border-slate-800 p-6 overflow-auto custom-scrollbar">
                        <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" /> Output Console
                        </h3>
                        <pre className="font-mono text-xs text-emerald-400 leading-relaxed">
                            {output ? (
                                <div className={output.includes("Error") ? "text-red-400" : "text-emerald-400"}>
                                    <span className="opacity-50 mr-2">$</span> {output}
                                </div>
                            ) : (
                                <div className="text-slate-700 italic">Code output will appear here...</div>
                            )}
                        </pre>
                    </div>
                </aside>
            </div>

            {/* Navigation Footer */}
            <footer className="h-16 bg-slate-900 border-t border-slate-800 px-8 flex justify-between items-center z-20 shadow-2xl">
                <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold">
                    <ChevronLeft className="w-4 h-4" /> Previous Lesson
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/3"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-2">Progress 33%</span>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-bold transition-all">
                    Next Lesson <ChevronRight className="w-4 h-4 text-blue-500" />
                </button>
            </footer>
        </div>
    );
};

export default CoursePlayer;
