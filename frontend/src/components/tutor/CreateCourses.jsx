import React, { useState } from "react";
import api from "../../services/api";
import Navbar from "../common/Navbar";
import {
  PlusCircle, BookOpen, IndianRupee,
  Image as ImageIcon, AlignLeft,
  ChevronRight, Sparkles, ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/courses", form);
      alert("Course submitted for approval! 🎉");
      navigate("/tutor/manage-courses");
    } catch (error) {
      console.error(error);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Course Builder
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Curriculum</span>
          </h1>
          <p className="text-slate-400">Your course will be sent to the admin for review before going live.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm shadow-2xl">
            <div className="grid gap-8">
              {/* Title */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest ml-1">
                  <BookOpen className="w-4 h-4" /> Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Advanced System Design Masterclass"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest ml-1">
                  <AlignLeft className="w-4 h-4" /> Comprehensive Description
                </label>
                <textarea
                  name="description"
                  placeholder="Outline the learning objectives, prerequisites, and what students will build..."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Price */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest ml-1">
                    <IndianRupee className="w-4 h-4" /> Enrollment Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-10 pr-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 font-bold"
                      required
                    />
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest ml-1">
                    <ImageIcon className="w-4 h-4" /> Thumbnail URL
                  </label>
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="https://images.unsplash.com/..."
                    value={form.thumbnail}
                    onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2rem]">
            <div className="flex items-center gap-4 text-sm text-blue-400 font-bold">
              <ShieldCheck className="w-10 h-10 opacity-20" />
              <p className="max-w-xs leading-tight">Your course will undergo a quality check by our administration team.</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
            >
              {loading ? "PROCESSING..." : "SUBMIT FOR APPROVAL"}
              {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateCourse;
