import React from "react";

/* ── Color cycling for insight cards ── */
const THEMES = [
  { accent: "#059669", bg: "rgba(5,150,105,0.08)",  border: "rgba(5,150,105,0.2)",  dot: "#34d399", label: "Positive" },
  { accent: "#2563eb", bg: "rgba(37,99,235,0.07)",  border: "rgba(37,99,235,0.2)",  dot: "#60a5fa", label: "Info"     },
  { accent: "#d97706", bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.2)",  dot: "#fbbf24", label: "Note"     },
  { accent: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", dot: "#a78bfa", label: "Insight"  },
  { accent: "#db2777", bg: "rgba(219,39,119,0.07)", border: "rgba(219,39,119,0.2)", dot: "#f472b6", label: "Alert"    },
];

const Insights = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: "linear-gradient(90deg,rgba(255,251,235,0.8),rgba(255,237,213,0.5))" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)" }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Smart Insights</h2>
          <p className="text-xs text-slate-400 mt-0.5">AI-generated observations from your dataset</p>
        </div>
        <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: "rgba(251,191,36,0.15)", color: "#d97706", border: "1px solid rgba(251,191,36,0.3)" }}>
          {insights.length} findings
        </span>
      </div>

      {/* Insight cards grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight, index) => {
          const t = THEMES[index % THEMES.length];
          return (
            <div key={index} className="flex items-start gap-3 rounded-xl p-4 transition-all duration-150"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {/* Dot + number */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-black"
                style={{ background: t.accent, boxShadow: `0 4px 10px ${t.accent}55` }}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.dot }} />
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: t.accent }}>
                    {t.label}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;