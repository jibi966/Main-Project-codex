import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import socket from "../../socket";
import { Send, User, MessageSquare, Search, Clock, LifeBuoy, MoreVertical, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSupport = () => {
    const adminId = localStorage.getItem("userId");
    const adminName = localStorage.getItem("name") || "Admin";

    const [chats, setChats] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loadingChats, setLoadingChats] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const chatEndRef = useRef(null);

    useEffect(() => {
        if (!adminId) return;

        // 1. Join Admin Support Lobby
        socket.emit("join-admin-support");

        // 2. Fetch all active support chats
        fetchActiveChats();

        // 3. Listen for new support notifications (to update list)
        socket.on("new-support-notification", (notification) => {
            fetchActiveChats(); // Refresh list to show latest message/user
        });

        // 4. Listen for real-time messages (if we are in a chat)
        socket.on("receive-support-message", (newMessage) => {
            if (selectedUser && newMessage.supportUserId === selectedUser.userId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off("new-support-notification");
            socket.off("receive-support-message");
        };
    }, [adminId, selectedUser]);

    const fetchActiveChats = async () => {
        try {
            const res = await api.get("/support/admin/all");
            // Map _id to userId for consistency
            const mappedChats = res.data.map(chat => ({
                ...chat,
                userId: chat._id
            }));
            setChats(mappedChats);
        } catch (error) {
            console.error("Failed to fetch support chats:", error);
        } finally {
            setLoadingChats(false);
        }
    };

    const fetchUserHistory = async (user) => {
        setLoadingMessages(true);
        setSelectedUser(user);
        try {
            socket.emit("join-support", user.userId); // Join this user's specific room
            const res = await api.get(`/support/admin/history/${user.userId}`);
            setMessages(res.data);
        } catch (error) {
            console.error("Failed to load history:", error);
        } finally {
            setLoadingMessages(false);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim() || !selectedUser) return;

        const messageData = {
            supportUserId: selectedUser.userId,
            message: input,
            senderId: adminId,
            senderName: adminName,
            role: "admin",
            isAdmin: true
        };

        socket.emit("send-support-message", messageData);
        setInput("");
    };

    const filteredChats = chats.filter(chat =>
        chat.senderName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-6rem)] bg-[#020617] text-white font-sans flex overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl">
            {/* Left Sidebar: Chat List */}
            <aside className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/30 backdrop-blur-3xl">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <LifeBuoy className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Support</h2>
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Command Center</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search users..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loadingChats ? (
                        <div className="p-10 flex justify-center"><div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div></div>
                    ) : filteredChats.length === 0 ? (
                        <div className="p-10 text-center opacity-30">
                            <MessageSquare className="w-10 h-10 mx-auto mb-3" />
                            <p className="text-xs font-bold uppercase tracking-widest">No active tickets</p>
                        </div>
                    ) : (
                        filteredChats.map((chat) => (
                            <button
                                key={chat.userId}
                                onClick={() => fetchUserHistory(chat)}
                                className={`w-full p-6 flex items-start gap-4 transition-all hover:bg-slate-800/50 text-left border-b border-slate-800/50 ${selectedUser?.userId === chat.userId ? 'bg-blue-600/10 border-r-4 border-r-blue-500' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold border border-slate-700 shadow-inner">
                                    {chat.senderName?.[0] || <User className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-sm truncate pr-2">{chat.senderName}</h4>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${chat.role === 'tutor' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                            {chat.role}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate font-medium">{chat.lastMessage}</p>
                                    <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase">{new Date(chat.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </aside>

            {/* Right Side: Conversation Area */}
            <main className="flex-1 flex flex-col bg-slate-950/20 relative">
                {!selectedUser ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <MessageSquare className="w-24 h-24 mb-6" />
                        </motion.div>
                        <h3 className="text-2xl font-black uppercase tracking-[0.2em] mb-2">Select a Conversation</h3>
                        <p className="text-sm font-medium">Click on a user profile to start assisting them in real-time.</p>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20 font-black text-xl">
                                    {selectedUser.senderName?.[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none mb-1">{selectedUser.senderName}</h3>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedUser.role} Account • Online</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 hover:bg-slate-800 rounded-2xl text-slate-500 transition-all"><CheckCircle className="w-5 h-5" /></button>
                                <button className="p-3 hover:bg-slate-800 rounded-2xl text-slate-500 transition-all"><MoreVertical className="w-5 h-5" /></button>
                            </div>
                        </header>

                        {/* Message Feed */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                            {loadingMessages ? (
                                <div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div></div>
                            ) : (
                                messages.map((msg, i) => {
                                    const isMe = msg.isAdmin === true;
                                    return (
                                        <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`max-w-[70%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-xl ${isMe
                                                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none'
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}
                                            >
                                                {msg.message}
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-600 mt-2 px-3 uppercase tracking-tighter">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-8 border-t border-slate-800 bg-slate-900/30">
                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={`Reply to ${selectedUser.senderName}...`}
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest disabled:opacity-50"
                                >
                                    Send
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            ` }} />
        </div>
    );
};

export default AdminSupport;
