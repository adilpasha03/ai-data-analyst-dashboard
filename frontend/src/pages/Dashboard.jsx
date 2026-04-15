import React, { useState } from "react";
import ChartView from "../components/ChartView";
import FileUpload from "../components/FileUpload";
import DataTable from "../components/DataTable";
import ChatBox from "../components/ChatBox";
import Insights from "../components/Insights";
import { generateInsights } from "../utils/insights";
import {
  getTopProducts,
  getTotalSales,
  getAverageSales,
} from "../utils/dataUtils";

/* ─── tiny icon helper so JSX stays clean ─── */
const Icon = ({ d, className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

const NAV = [
  { id: "dashboard", label: "Dashboard",
    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "analytics", label: "Analytics",
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "reports",   label: "Reports",
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "upload",    label: "Upload",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
];

const Dashboard = () => {
  const [data, setData]       = useState([]);
  const [result, setResult]   = useState(null);
  const [activePage, setActivePage] = useState("dashboard"); // sidebar state

  /* ── all logic unchanged ── */
  const handleTopProducts  = () => setResult(getTopProducts(data, 2));
  const handleTotalSales   = () => setResult(getTotalSales(data));
  const handleAverageSales = () => setResult(getAverageSales(data));

  const stats = [
    {
      label: "Total Sales",
      value: data.length > 0 ? getTotalSales(data) : null,
      badge: "Revenue",
      color: "blue",
      iconD: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Average Sales",
      value: data.length > 0 ? getAverageSales(data).toFixed(2) : null,
      badge: "Avg",
      color: "violet",
      iconD: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      label: "Top Product",
      value: data.length > 0 && getTopProducts(data, 1).length > 0 ? getTopProducts(data, 1)[0].product : null,
      badge: "Leader",
      color: "amber",
      iconD: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
  ];

  const colorMap = {
    blue:   { icon: "bg-blue-100 text-blue-600",   badge: "bg-blue-50 text-blue-600",   ring: "hover:ring-blue-200" },
    violet: { icon: "bg-violet-100 text-violet-600", badge: "bg-violet-50 text-violet-600", ring: "hover:ring-violet-200" },
    amber:  { icon: "bg-amber-100 text-amber-600",  badge: "bg-amber-50 text-amber-600",  ring: "hover:ring-amber-200" },
  };

  return (
    <div className="h-screen flex" style={{ background: "#f0f4ff", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ════════════════ SIDEBAR ════════════════ */}
      <aside className="w-60 shrink-0 flex flex-col" style={{
        background: "linear-gradient(180deg, #1e2b4a 0%, #162038 100%)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.15)"
      }}>

        {/* Brand */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #4f8ef7, #7c5cfc)" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-tight tracking-tight">DataLens AI</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Analytics Platform</p>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <div className="px-5 pt-5 pb-1">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Main Menu
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ id, label, d }) => {
            const active = activePage === id;
            return (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={active ? {
                  background: "linear-gradient(135deg, rgba(79,142,247,0.25), rgba(124,92,252,0.2))",
                  color: "#fff",
                  boxShadow: "inset 0 0 0 1px rgba(79,142,247,0.4)",
                } : {
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all`}
                  style={active
                    ? { background: "linear-gradient(135deg, #4f8ef7, #7c5cfc)" }
                    : { background: "rgba(255,255,255,0.07)" }}>
                  <Icon d={d} className="w-4 h-4" />
                </span>
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-5 rounded-full" style={{ background: "linear-gradient(180deg,#4f8ef7,#7c5cfc)" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 16px" }} />

        {/* User footer */}
        <div className="px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #4f8ef7, #7c5cfc)" }}>
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">Admin User</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>admin@datalens.ai</p>
          </div>
          <button className="shrink-0 p-1.5 rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
            <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ════════════════ MAIN ════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between px-8 py-4"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(99,102,241,0.1)", boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">AI Data Analyst Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">Upload your CSV · Ask questions · Get instant insights</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)", color: "#059669", border: "1px solid #a7f3d0" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Online
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="w-3.5 h-3.5 text-slate-400" />
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

          {/* Upload */}
          <FileUpload setData={setData} />

          {/* Chat */}
          <ChatBox data={data} setResult={setResult} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Top Products",  fn: handleTopProducts,  bg: "linear-gradient(135deg,#059669,#047857)", shadow: "rgba(5,150,105,0.35)", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
              { label: "Total Sales",   fn: handleTotalSales,   bg: "linear-gradient(135deg,#2563eb,#1d4ed8)", shadow: "rgba(37,99,235,0.35)",  d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Average Sales", fn: handleAverageSales, bg: "linear-gradient(135deg,#7c3aed,#6d28d9)", shadow: "rgba(124,58,237,0.35)", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
            ].map(({ label, fn, bg, shadow, d }) => (
              <button key={label} onClick={fn}
                className="flex items-center gap-2.5 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all duration-150 active:scale-95"
                style={{ background: bg, boxShadow: `0 4px 14px ${shadow}` }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <Icon d={d} className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* AI Result */}
          {result && (
            <div className="rounded-2xl p-5 border"
              style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", borderColor: "rgba(99,102,241,0.2)", boxShadow: "0 4px 20px rgba(99,102,241,0.08)" }}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}>
                  <Icon d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-sm font-bold text-slate-700">AI Result</h2>
                <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#4f46e5" }}>
                  {Array.isArray(result) ? `${result.length} items` : "Computed"}
                </span>
              </div>
              {Array.isArray(result) ? (
                <pre className="text-xs rounded-xl p-4 overflow-auto leading-relaxed font-mono text-slate-600"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <p className="text-4xl font-black text-slate-800 tracking-tight">{result}</p>
              )}
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, badge, color, iconD }) => {
              const c = colorMap[color];
              return (
                <div key={label}
                  className={`bg-white rounded-2xl p-5 transition-all duration-200 cursor-default group hover:ring-2 ${c.ring}`}
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon d={iconD} className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.badge}`}>{badge}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-800 tracking-tight leading-none truncate">
                    {value ?? <span className="text-slate-200 text-2xl">No data</span>}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wide">{label}</p>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <ChartView data={data} />

          {/* Insights */}
          <Insights insights={generateInsights(data)} />

          {/* Table */}
          <DataTable data={data} />

          {/* bottom padding */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;