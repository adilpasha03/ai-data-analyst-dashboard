import React, { useState } from "react";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  /* ── Logic unchanged ── */
  const columns = Object.keys(data[0]);

  /* ── UI-only: search filter ── */
  const [search, setSearch] = useState("");
  const filtered = data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-3"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: "linear-gradient(90deg,rgba(241,245,249,0.8),rgba(248,250,252,0.8))" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#64748b,#475569)" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 10h18M3 14h18M10 4v16M14 4v16M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Data Table</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {filtered.length} of {data.length} records
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", minWidth: "200px" }}>
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search records…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #f1f5f9" }}>
              <th className="px-5 py-3 text-left w-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">#</span>
              </th>
              {columns.map((col, i) => (
                <th key={i} className="px-5 py-3 text-left">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{col}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <p className="text-sm font-medium">No matching records</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i}
                  className="transition-colors duration-100"
                  style={{
                    borderBottom: "1px solid #f8fafc",
                    background: i % 2 === 0 ? "#ffffff" : "#fafbff",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#ffffff" : "#fafbff"}>

                  {/* Row number */}
                  <td className="px-5 py-3.5">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: "#f1f5f9", color: "#94a3b8" }}>
                      {i + 1}
                    </span>
                  </td>

                  {columns.map((col, j) => {
                    const val  = row[col];
                    const isNum = !isNaN(val) && val !== "" && val !== null;
                    return (
                      <td key={j} className="px-5 py-3.5 whitespace-nowrap">
                        {isNum
                          ? <span className="font-bold text-slate-800">{Number(val).toLocaleString()}</span>
                          : <span className="text-slate-600">{val}</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #f1f5f9", background: "#fafbff" }}>
        <p className="text-xs text-slate-400">
          Showing <span className="font-bold text-slate-600">{filtered.length}</span> of <span className="font-bold text-slate-600">{data.length}</span> rows
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Data loaded
        </div>
      </div>
    </div>
  );
};

export default DataTable;