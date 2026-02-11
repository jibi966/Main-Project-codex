import React, { useState } from "react";
import api from "../../services/api";
import { Send, Mail, User, MessageSquare, Globe, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        try {
            await api.post("/contacts", formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (error) {
            setStatus({ loading: false, success: false, error: error.response?.data?.message || "Something went wrong" });
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 font-sans px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Globe className="w-3 h-3" />
                            Get In Touch
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Connect</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md font-medium">
                            Have questions or feedback? We're here to help. Send us a message and our team will get back to you shortly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { icon: Mail, label: "Email Us", value: "support@codex.com" },
                            { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000" },
                            { icon: MapPin, label: "Visit Us", value: "San Francisco, CA" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-5 p-4 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-blue-500/30 transition-colors group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="font-bold text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-2xl opacity-10 animate-pulse"></div>
                    <form
                        onSubmit={handleSubmit}
                        className="relative bg-slate-900/60 border border-slate-800 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                            <input
                                required
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us more about your inquiry..."
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm resize-none"
                            ></textarea>
                        </div>

                        <button
                            disabled={status.loading}
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            {status.loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {status.success && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-emerald-400 font-bold text-sm">
                                Message sent successfully! We'll be in touch.
                            </motion.p>
                        )}
                        {status.error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-rose-400 font-bold text-sm">
                                {status.error}
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>

            <style jsx>{`
                .text-glow {
                    text-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
                }
            `}</style>
        </div>
    );
};

export default ContactUs;
