import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Video, Calendar, Link as LinkIcon, Send, CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";

const ScheduleLiveClass = () => {
  const [form, setForm] = useState({
    title: "",
    meetingLink: "",
    schedule: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mySessions, setMySessions] = useState([]);
  const [fetchingSessions, setFetchingSessions] = useState(true);

  useEffect(() => {
    fetchMySessions();
  }, []);

  const fetchMySessions = async () => {
    try {
      const res = await api.get("/live-classes/my-sessions");
      setMySessions(res.data);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setFetchingSessions(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await api.post("/live-classes/create", form);
      setSuccess(true);
      setForm({ title: "", meetingLink: "", schedule: "" });
      fetchMySessions();
    } catch (error) {
      console.error("Failed to create live class:", error);
      alert("Failed to schedule class. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const endClass = async (id) => {
    if (!window.confirm("Are you sure you want to end this class? Students will no longer be able to join.")) return;

    try {
      await api.put(`/live-classes/end/${id}`);
      fetchMySessions();
    } catch (error) {
      alert("Failed to end class.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white pb-20">
      <main className="max-w-6xl mx-auto px-6 font-sans">
        <header className="mb-12 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Video className="w-4 h-4" />
            Tutor Portal
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Live Session <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Command Center</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Schedule new sessions or manage your active classes. Ending a class will instantly hide it from student dashboards.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT: Schedule Form */}
          <section className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden h-fit">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> Schedule New
            </h2>

            {success && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400 animate-in fade-in slide-in-from-top-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Success! Your class is live for students.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Class Title</label>
                <div className="relative">
                  <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="title"
                    value={form.title}
                    placeholder="e.g. Advanced JavaScript Masterclass"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 shadow-inner"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Meeting Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="meetingLink"
                    value={form.meetingLink}
                    placeholder="Google Meet or Zoom URL"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 shadow-inner"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Schedule Date & Time</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="datetime-local"
                    name="schedule"
                    value={form.schedule}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Publish Live Session"}
              </button>
            </form>
          </section>

          {/* RIGHT: Manage Sessions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
              <Clock className="w-5 h-5 text-purple-400" /> My Scheduled Sessions
            </h2>

            {fetchingSessions ? (
              <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div></div>
            ) : mySessions.length > 0 ? (
              <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                {mySessions.map((session) => (
                  <div key={session._id} className={`p-6 rounded-3xl border transition-all ${session.status === 'ended' ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/30 shadow-xl shadow-black/20'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1 leading-tight">{session.title}</h3>
                        <p className="text-xs text-slate-500 font-medium mb-3">ID: {session._id}</p>
                        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 text-blue-400">
                            <Calendar className="w-3 h-3" /> {new Date(session.schedule).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5 text-purple-400">
                            <Clock className="w-3 h-3" /> {new Date(session.schedule).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${session.status === 'ended' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                        {session.status}
                      </div>
                    </div>

                    {session.status !== 'ended' && (
                      <div className="mt-6 flex gap-3">
                        <a href={session.meetingLink} target="_blank" rel="noreferrer" className="flex-1 py-2.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                          Open Meet <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => endClass(session._id)}
                          className="flex-1 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          End Session <XCircle className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-slate-800/20 border border-dashed border-slate-700 rounded-3xl">
                <Video className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm font-medium">No live sessions found.<br />Start by scheduling one on the left!</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default ScheduleLiveClass;
