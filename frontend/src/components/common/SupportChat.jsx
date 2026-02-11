import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import socket from "../../socket";
import { Send, MessageSquare, Lock, LifeBuoy, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SupportChat = () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("name") || "User";
    const userRole = localStorage.getItem("role") || "user";

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (!userId) return;

        console.log("Connecting to support room for user:", userId);
        socket.emit("join-support", userId);

        const fetchHistory = async () => {
            try {
                const res = await api.get("/support/history");
                setMessages(res.data);
            } catch (error) {
                console.error("Failed to load support history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();

        socket.on("receive-support-message", (newMessage) => {
            console.log("Received new support message:", newMessage);
            setMessages((prev) => {
                // Prevent duplicates from same user within 1 second if content matches
                const isDuplicate = prev.some(m =>
                    m.message === newMessage.message &&
                    m.senderId === newMessage.senderId &&
                    Math.abs(new Date(m.createdAt) - new Date(newMessage.createdAt)) < 1000
                );
                return isDuplicate ? prev : [...prev, newMessage];
            });
        });

        return () => {
            socket.off("receive-support-message");
        };
    }, [userId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const quickReplies = [
        { label: "Payment Issue", icon: "💳", text: "Hello! I'm having an issue with a payment or subscription. Can you help me?" },
        { label: "Technical Bug", icon: "🐞", text: "Hi, I encountered a technical problem while using the platform. Could you assist?" },
        { label: "Course Help", icon: "📚", text: "I have a question regarding the course content I'm currently studying. Who can help?" },
        { label: "Career Guidance", icon: "🚀", text: "I'd like to discuss my learning path and career opportunities. Is there a mentor available?" },
        { label: "General Query", icon: "💬", text: "Hello! I have a general question about the IntegraX platform. Can we chat?" }
    ];

    const sendQuickReply = (text) => {
        if (sending) return;

        const messageData = {
            supportUserId: userId,
            message: text,
            senderId: userId,
            senderName: userName,
            role: userRole,
            isAdmin: false
        };

        console.log("Sending quick reply:", messageData);
        socket.emit("send-support-message", messageData);

        // Optimistic update for better "professional" feel
        const optimisticMsg = {
            ...messageData,
            _id: Date.now(),
            createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, optimisticMsg]);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || sending) return;

        setSending(true);
        const messageData = {
            supportUserId: userId,
            message: input,
            senderId: userId,
            senderName: userName,
            role: userRole,
            isAdmin: false
        };

        console.log("Sending support message:", messageData);
        socket.emit("send-support-message", messageData);
        setInput("");
        setSending(false);
    };

    if (!userId) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center p-10">
                <Lock className="w-16 h-16 text-slate-700 mb-4" />
                <h2 className="text-2xl font-bold">Please Login</h2>
                <p className="text-slate-500">You need to be logged in to access live support.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] bg-[#020617] text-white font-sans flex flex-col">
            <main className="max-w-5xl mx-auto w-full flex-1 flex flex-col px-6 py-8">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3"
                        >
                            <LifeBuoy className="w-3 h-3" />
                            Live Support Center
                        </motion.div>
                        <h1 className="text-3xl font-black tracking-tight">
                            Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Channel</span>
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="pr-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</p>
                            <p className="text-xs font-bold text-white">Admins Online</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-3xl flex flex-col overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10 opacity-50"></div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar relative z-0">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                <MessageSquare className="w-16 h-16 mb-4" />
                                <h3 className="text-xl font-bold uppercase tracking-widest">Start a conversation</h3>
                                <p className="text-sm font-medium">Send a message to our admin team</p>
                            </div>
                        ) : (
                            messages.map((msg, i) => {
                                const isMe = String(msg.sender) === String(userId) || String(msg.senderId) === String(userId);
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        key={i}
                                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2 px-2">
                                            {!isMe && <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{msg.isAdmin ? 'ADMIN' : msg.senderName}</span>}
                                            {isMe && <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">YOU</span>}
                                        </div>
                                        <div className={`max-w-[80%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-lg ${isMe
                                            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none'
                                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                                            }`}>
                                            {msg.message}
                                        </div>
                                        <span className="text-[8px] font-bold text-slate-500 mt-2 px-2 uppercase tracking-tighter">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </motion.div>
                                );
                            })
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-6 bg-slate-900/80 border-t border-slate-800 backdrop-blur-xl">
                        {/* Quick Replies */}
                        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                            {quickReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendQuickReply(reply.text)}
                                    className="whitespace-nowrap px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <span>{reply.icon}</span>
                                    {reply.label}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto flex gap-4">
                            <div className="relative flex-1">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Describe your issue..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 flex-1 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!input.trim() || sending}
                                className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center group"
                            >
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </div>
    );
};

export default SupportChat;
