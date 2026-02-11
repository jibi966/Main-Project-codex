import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    // On mobile, collapsed actually means HIDDEN.
    // We initialize based on screen width
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const location = useLocation();
    const isCodeRoom = location.pathname.startsWith("/code-room");

    // Close sidebar on mobile when navigating
    useEffect(() => {
        if (window.innerWidth < 768) {
            setCollapsed(true);
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden relative">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCollapsed(true)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] md:hidden"
                    />
                )}
            </AnimatePresence>

            {!isCodeRoom && (
                <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} isSidebarCollapsed={collapsed} />
            )}
            <div className={`flex ${isCodeRoom ? "pt-0" : "pt-24"}`}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex-1 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`}
                >
                    <div className={`${isCodeRoom ? "max-w-none px-0 py-0" : "max-w-7xl mx-auto px-6 py-8"}`}>
                        {children}
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

export default Layout;
