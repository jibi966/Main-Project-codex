import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
    User, Settings as SettingsIcon, Monitor, Code,
    Bell, Shield, Github, Linkedin, Twitter, Save,
    Key, Eye, EyeOff, CheckCircle, AlertCircle, Trash2,
    Cpu, Atom, Globe, Database, Network, Terminal, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState({ type: null, message: "" });

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        specialization: "",
        experience: "",
        qualification: "",
        settings: {
            theme: "dark",
            avatar: "cpu",
            editorTheme: "vs-dark",
            fontSize: 14,
            notifications: { email: true, push: true }
        },
        socials: { github: "", linkedin: "", twitter: "" }
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    const avatarIcons = {
        cpu: Cpu, atom: Atom, globe: Globe, database: Database,
        network: Network, terminal: Terminal, layers: Layers, user: User
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/settings");
            setFormData(res.data);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
            showStatus("error", "Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const showStatus = (type, message) => {
        setStatus({ type, message });
        setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleToggleChange = (parent, child) => {
        setFormData(prev => {
            const parentObj = prev[parent] || {};
            return {
                ...prev,
                [parent]: { ...parentObj, [child]: !parentObj[child] }
            };
        });
    };

    const handleAvatarSelect = (avatarKey) => {
        setFormData(prev => ({
            ...prev,
            settings: { ...prev.settings, avatar: avatarKey }
        }));
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            await api.put("/settings", formData);
            showStatus("success", "Settings updated successfully");

            // Update local storage for immediate UI feedback elsewhere
            localStorage.setItem("name", formData.name);
            localStorage.setItem("userAvatar", formData.settings.avatar);
            if (formData.settings.theme) localStorage.setItem("theme", formData.settings.theme);

        } catch (error) {
            showStatus("error", error.response?.data?.message || "Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return showStatus("error", "Passwords do not match");
        }
        setSaving(true);
        try {
            await api.put("/settings/password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            showStatus("success", "Password updated successfully");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            showStatus("error", error.response?.data?.message || "Failed to update password");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#020617]">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "interface", label: "Interface", icon: Monitor },
        { id: "coding", label: "Coding", icon: Code },
        { id: "notifications", label: "Alerts", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* Navigation Sidebar */}
                <aside className="w-full lg:w-72 space-y-2">
                    <header className="mb-8 px-4">
                        <h1 className="text-3xl font-black tracking-tight mb-2">Settings</h1>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Environment Config</p>
                    </header>

                    <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-left min-w-[160px] lg:min-w-0 ${activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5 shrink-0" />
                                <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] backdrop-blur-3xl p-8 md:p-12 shadow-2xl"
                        >
                            {activeTab === "profile" && (
                                <form onSubmit={handleSave} className="space-y-12">
                                    {/* Avatar Selection */}
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                                            <Atom className="w-3 h-3" />
                                            Digital Identity
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {Object.entries(avatarIcons).map(([key, Icon]) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => handleAvatarSelect(key)}
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${formData.settings?.avatar === key
                                                        ? "border-blue-500 bg-blue-500/20 text-white shadow-lg shadow-blue-500/20"
                                                        : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                                                        }`}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                name="name"
                                                value={formData.name || ""}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Specialization</label>
                                            <input
                                                name="specialization"
                                                value={formData.specialization || ""}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Full Stack Developer"
                                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Professional Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio || ""}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium resize-none"
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Connect Socials</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { id: "github", icon: Github, label: "GitHub" },
                                                { id: "linkedin", icon: Linkedin, label: "LinkedIn" },
                                                { id: "twitter", icon: Twitter, label: "Twitter" }
                                            ].map(social => (
                                                <div key={social.id} className="relative">
                                                    <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        name={`socials.${social.id}`}
                                                        value={formData.socials?.[social.id] || ""}
                                                        onChange={handleInputChange}
                                                        placeholder={social.label}
                                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-xs font-medium"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-500/20 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {saving ? "Processing..." : "Save Changes"}
                                            <Save className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === "interface" && (
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Interface Components</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { id: "sidebar", label: "Auto-collapse Sidebar", desc: "Minimize sidebar when screen is small." },
                                                { id: "glass", label: "Glassmorphism Effects", desc: "Enable advanced transparency and blurs." }
                                            ].map(comp => (
                                                <div key={comp.id} className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl flex items-start justify-between">
                                                    <div>
                                                        <p className="font-bold text-sm mb-1">{comp.label}</p>
                                                        <p className="text-[10px] text-slate-500 font-medium">{comp.desc}</p>
                                                    </div>
                                                    <button
                                                        className={`w-12 h-6 rounded-full relative transition-all ${comp.id === 'glass' ? 'bg-blue-600' : 'bg-slate-800'}`}
                                                    >
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${comp.id === 'glass' ? 'right-1' : 'left-1'}`}></div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button onClick={() => handleSave()} className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-500/20 font-black uppercase text-[10px] tracking-widest transition-all">
                                            {saving ? "Processing..." : "Update Preferences"}
                                            <Save className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "coding" && (
                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Editor Experience</h3>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Theme (Monaco)</label>
                                                <select
                                                    name="settings.editorTheme"
                                                    value={formData.settings?.editorTheme}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium appearance-none"
                                                >
                                                    <option value="vs-dark">VS Dark (Standard)</option>
                                                    <option value="cobalt">Cobalt (High Contrast)</option>
                                                    <option value="monokai">Monokai (Retro)</option>
                                                    <option value="hc-black">High Contrast Black</option>
                                                </select>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Font Size (px)</label>
                                                <input
                                                    type="number"
                                                    name="settings.fontSize"
                                                    value={formData.settings?.fontSize}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
                                            <Code className="w-16 h-16 text-blue-500/20 mb-4" />
                                            <h4 className="font-bold mb-2">Live Preview</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Coming soon: Instant preview of your code room settings.</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button onClick={() => handleSave()} className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-500/20 font-black uppercase text-[10px] tracking-widest transition-all">
                                            {saving ? "Processing..." : "Apply Config"}
                                            <Save className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-8">
                                    <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl mb-8">
                                        <p className="text-xs text-blue-400 font-medium leading-relaxed">
                                            Managing how you stay informed. Receive alerts about course updates, mentor responses, and system achievements.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { id: "email", label: "Email Notifications", desc: "Weekly digests and important account alerts." },
                                            { id: "push", label: "Real-time Push Alerts", desc: "Browser notifications for immediate interactions." }
                                        ].map(item => (
                                            <div key={item.id} className="p-6 bg-slate-950/30 border border-slate-800/50 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                                                        <Bell className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm mb-1">{item.label}</p>
                                                        <p className="text-[10px] text-slate-600 font-medium">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleChange("settings.notifications", item.id)}
                                                    className={`w-14 h-7 rounded-full transition-all relative ${formData.settings.notifications?.[item.id] ? 'bg-blue-600' : 'bg-slate-800'}`}
                                                >
                                                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${formData.settings.notifications?.[item.id] ? 'right-1' : 'left-1'}`}></div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button onClick={() => handleSave()} className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-500/20 font-black uppercase text-[10px] tracking-widest transition-all">
                                            {saving ? "Processing..." : "Save Preferences"}
                                            <Save className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-12">
                                    <form onSubmit={handlePasswordChange} className="space-y-6">
                                        <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                            <Key className="w-3 h-3" />
                                            Authentication Refresh
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { id: "current", label: "Current Password", key: "currentPassword" },
                                                { id: "new", label: "New Password", key: "newPassword" },
                                                { id: "confirm", label: "Confirm New", key: "confirmPassword" }
                                            ].map(field => (
                                                <div key={field.id} className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{field.label}</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords[field.id] ? "text" : "password"}
                                                            value={passwordData[field.key]}
                                                            onChange={(e) => setPasswordData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                            required
                                                            autoComplete="new-password"
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-5 pr-12 focus:ring-2 focus:ring-rose-500/50 outline-none transition-all text-xs font-medium"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPasswords(prev => ({ ...prev, [field.id]: !prev[field.id] }))}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
                                                        >
                                                            {showPasswords[field.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                disabled={saving || !passwordData.newPassword}
                                                className="flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl shadow-xl shadow-rose-500/20 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                {saving ? "Syncing..." : "Update Password"}
                                                <Key className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </form>

                                    <div className="h-px bg-slate-800"></div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danger Zone</h3>
                                        <div className="p-8 border border-rose-500/20 rounded-[2.5rem] bg-rose-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div>
                                                <p className="font-black text-sm text-rose-500 uppercase tracking-tight mb-1">Erase Neural Data</p>
                                                <p className="text-xs text-slate-500 font-medium">Permanently delete your account and all associated progress.</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="flex items-center gap-3 px-8 py-4 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
                                            >
                                                Delete Permanent
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Global Status Toast */}
            <AnimatePresence>
                {status.type && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-10 right-10 z-[200] px-6 py-4 rounded-2xl border flex items-center gap-4 shadow-2xl backdrop-blur-3xl ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                            }`}
                    >
                        {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="text-xs font-black uppercase tracking-widest">{status.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default Settings;
