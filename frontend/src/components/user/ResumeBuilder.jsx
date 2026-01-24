import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Plus,
  Trash2,
  Save,
  Eye,
  Download,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  GraduationCap
} from "lucide-react";
import api from "../../services/api";

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState({
    title: "My Professional Resume",
    personal: {
      name: "",
      email: "",
      phone: "",
      summary: "",
    },
    experience: [],
    education: [],
  });

  const [currentExp, setCurrentExp] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [currentEdu, setCurrentEdu] = useState({
    institution: "",
    degree: "",
    year: "",
  });

  const handlePersonalChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value },
    });
  };

  const addExperience = () => {
    if (currentExp.company && currentExp.role) {
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, currentExp],
      });
      setCurrentExp({ company: "", role: "", startDate: "", endDate: "", description: "" });
    }
  };

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (currentEdu.institution && currentEdu.degree) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, currentEdu],
      });
      setCurrentEdu({ institution: "", degree: "", year: "" });
    }
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  const saveResume = async () => {
    setLoading(true);
    try {
      const response = await api.post("/resumes", {
        ...resumeData,
        userId: localStorage.getItem("userId"), // Ensure userId is passed if needed
      });
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Personal Details", icon: <User className="w-5 h-5" /> },
    { title: "Work Experience", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Education", icon: <GraduationCap className="w-5 h-5" /> },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={resumeData.personal.name}
                    onChange={handlePersonalChange}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={resumeData.personal.email}
                    onChange={handlePersonalChange}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="phone"
                    value={resumeData.personal.phone}
                    onChange={handlePersonalChange}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Professional Summary</label>
              <textarea
                name="summary"
                value={resumeData.personal.summary}
                onChange={handlePersonalChange}
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Briefly describe your career goals and key achievements..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={currentExp.company}
                  onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={currentExp.role}
                  onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={currentExp.startDate}
                  onChange={(e) => setCurrentExp({ ...currentExp, startDate: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={currentExp.endDate}
                  onChange={(e) => setCurrentExp({ ...currentExp, endDate: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
              </div>
              <textarea
                placeholder="Description"
                value={currentExp.description}
                onChange={(e) => setCurrentExp({ ...currentExp, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                rows="2"
              />
              <button
                onClick={addExperience}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div>
                    <h4 className="font-bold text-white">{exp.role}</h4>
                    <p className="text-sm text-slate-400">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                  </div>
                  <button onClick={() => removeExperience(index)} className="text-red-400 hover:text-red-500 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={currentEdu.institution}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={currentEdu.degree}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={currentEdu.year}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, year: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-white outline-none"
                />
              </div>
              <button
                onClick={addEducation}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Education
              </button>
            </div>

            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div>
                    <h4 className="font-bold text-white">{edu.degree}</h4>
                    <p className="text-sm text-slate-400">{edu.institution} | {edu.year}</p>
                  </div>
                  <button onClick={() => removeEducation(index)} className="text-red-400 hover:text-red-500 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => (
    <div className="max-w-4xl mx-auto bg-white p-12 text-slate-900 min-h-[1000px] shadow-2xl rounded-sm font-serif animate-in zoom-in duration-300">
      <div className="border-b-4 border-slate-900 pb-8 mb-8 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{resumeData.personal.name || "Your Name"}</h1>
        <div className="flex justify-center gap-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <span>{resumeData.personal.email}</span>
          <span>•</span>
          <span>{resumeData.personal.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-1 space-y-8">
          <section>
            <h2 className="text-xl font-black border-l-4 border-blue-600 pl-3 mb-4 uppercase tracking-widest">Profile</h2>
            <p className="text-sm leading-relaxed text-slate-700 italic">{resumeData.personal.summary || "Add a professional summary..."}</p>
          </section>

          <section>
            <h2 className="text-xl font-black border-l-4 border-blue-600 pl-3 mb-4 uppercase tracking-widest">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-black text-sm">{edu.institution}</h4>
                  <p className="text-xs text-slate-600">{edu.degree} | {edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-black border-l-4 border-blue-600 pl-3 mb-4 uppercase tracking-widest">Experience</h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-black text-lg">{exp.role}</h4>
                    <span className="text-xs font-bold text-slate-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-blue-600 font-bold text-sm mb-2">{exp.company}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <FileText className="w-10 h-10 text-blue-500" />
              RESUME<span className="text-blue-500">BUILDER</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Craft your professional identity with AI-ready layouts.</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-700 rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              {previewMode ? <FileText className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {previewMode ? "Edit Mode" : "Preview"}
            </button>
            <button
              onClick={saveResume}
              disabled={loading}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </div>

        {!previewMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Stepper Navigation */}
            <div className="lg:col-span-3 space-y-4">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i + 1)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${step === i + 1
                      ? "bg-blue-600/10 border-blue-500 text-blue-400"
                      : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700"
                    }`}
                >
                  <div className={`p-2 rounded-lg ${step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-800"}`}>
                    {s.icon}
                  </div>
                  <span className="font-bold">{s.title}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="lg:col-span-9 bg-slate-900/30 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <h2 className="text-2xl font-black tracking-tight uppercase">{steps[step - 1].title}</h2>
                <div className="flex gap-2">
                  <button
                    disabled={step === 1}
                    onClick={() => setStep(step - 1)}
                    className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    disabled={step === 3}
                    onClick={() => setStep(step + 1)}
                    className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {renderStep()}
            </div>
          </div>
        ) : (
          renderPreview()
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fade-in 0.5s ease-out forwards; }
        .zoom-in { animation: zoom-in 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default ResumeBuilder;
