import React, { useState } from "react";
import axios from "axios";

/* ── Animated loading dots shown while AI is thinking ── */
const AIThinkingLoader = () => (
  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
    style={{ background: "linear-gradient(135deg,#eff6ff,#f5f3ff)", border: "1px solid rgba(99,102,241,0.18)" }}>
    {/* Animated icon */}
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}>
      <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-700">AI is thinking…</p>
      {/* Three bouncing dots */}
      <div className="flex gap-1.5 mt-1.5">
        {[0, 1, 2].map(i => (
          <span key={i}
            className="inline-block w-2 h-2 rounded-full bg-indigo-400"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
    <p className="ml-auto text-xs text-slate-400 font-medium">Processing query…</p>

    {/* keyframes injected once */}
    <style>{`
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
        40%            { transform: translateY(-6px); opacity: 1; }
      }
    `}</style>
  </div>
);

const SUGGESTIONS = [
  "Top 3 products",
  "Total sales",
  "Average sales",
  "Best performer",
];

const ChatBox = ({ data, setResult }) => {
  const [query, setQuery]       = useState("");
  const [loading, setLoading]   = useState(false); // ← NEW: track AI loading

  /* ── ALL original logic unchanged ── */
  const handleSend = async () => {
    if (!query) return;
    setLoading(true); // show loader

    try {
      const res = await axios.post("http://localhost:5000/ai", { query });
      const ai  = res.data.aiResponse;
      console.log("AI:", ai);

      if (ai.operation === "top") {
        const sorted = [...data]
          .sort((a, b) => Number(b.sales) - Number(a.sales))
          .slice(0, ai.limit);
        setResult(sorted);
      } else if (ai.operation === "total") {
        const total = data.reduce((sum, item) => sum + Number(item.sales), 0);
        setResult(total);
      } else if (ai.operation === "average") {
        const total = data.reduce((sum, item) => sum + Number(item.sales), 0);
        setResult((total / data.length).toFixed(2));
      }
    } catch (err) {
      console.error(err);
      alert("AI request failed");
    } finally {
      setLoading(false); // always hide loader
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: "linear-gradient(90deg,rgba(239,246,255,0.8),rgba(245,243,255,0.8))" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Ask AI Analyst</h2>
          <p className="text-xs text-slate-400 mt-0.5">Type a question or pick a suggestion below</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Ready
        </div>
      </div>

      {/* ── Loading animation OR suggestion chips ── */}
      <div className="px-6 pt-4 pb-2">
        {loading ? (
          <AIThinkingLoader />
        ) : (
          <div className="flex flex-wrap gap-2">
            <p className="w-full text-xs text-slate-400 font-medium mb-1">Quick queries:</p>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#eff6ff,#f5f3ff)"; e.currentTarget.style.color = "#4f46e5"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="px-6 pb-5 pt-3">
        <div className="flex items-center gap-3 rounded-xl px-4 py-1 transition-all"
          style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}
          onFocus={() => {}} /* focus ring handled by child input */
        >
          <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder='e.g. "Top 3 products by sales"'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 bg-transparent py-3 text-sm text-slate-700 placeholder-slate-400 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150"
            style={query.trim() && !loading
              ? { background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }
              : { background: "#e2e8f0", color: "#94a3b8", cursor: "not-allowed", boxShadow: "none" }}>
            {loading
              ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              : <>
                  Send
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
            }
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2.5">
          Press <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background:"#f1f5f9", border:"1px solid #e2e8f0" }}>Enter</kbd> to send · AI may make mistakes, verify results
        </p>
      </div>
    </div>
  );
};

export default ChatBox;