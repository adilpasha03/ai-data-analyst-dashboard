import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ── Premium custom tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3"
      style={{ background: "#1e2b4a", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</p>
      <p className="text-lg font-black text-white">{Number(payload[0].value).toLocaleString()}</p>
      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>sales units</p>
    </div>
  );
};

/* Bar colour ramp — cycles through a gradient palette */
const BAR_COLORS = ["#4f8ef7","#7c5cfc","#34d399","#f59e0b","#ef4444","#06b6d4","#8b5cf6","#10b981"];

const ChartView = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: "linear-gradient(90deg,rgba(239,246,255,0.8),rgba(245,243,255,0.6))" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Sales Chart</h2>
            <p className="text-xs text-slate-400 mt-0.5">Revenue by product · {data.length} records</p>
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "6px 12px", borderRadius: "8px" }}>
          <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }} />
          Sales Units
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 py-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 6, right: 6, left: -8, bottom: 0 }}>
            <defs>
              {BAR_COLORS.map((color, i) => (
                <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="product"
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)", radius: 8 }} />
            <Bar dataKey="sales" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {data.map((_, index) => (
                <Cell key={index} fill={`url(#barGrad${index % BAR_COLORS.length})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartView;