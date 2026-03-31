import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  PieChart, Pie, Legend,
  LineChart, Line,
} from "recharts";
import { Zap, FileText, Globe, Shield } from "lucide-react";

import ChartTooltip from "../components/ChartTooltip";
import { ANALYTICS_QUERIES, PLAN_DISTRIBUTION, TREND_DATA } from "../data/mockData";

export default function AnalyticsPage({ tenants }) {
  const avgQueries  = Math.floor(tenants.reduce((a, t) => a + t.queries, 0) / tenants.length);
  const totalDocs   = tenants.reduce((a, t) => a + t.docs,    0);
  const activeCnt   = tenants.filter(t => t.status === "active").length;
  const avgUsage    = Math.floor(tenants.reduce((a, t) => a + t.usage, 0) / tenants.length);

  const summaryCards = [
    { label: "Avg. Queries/Tenant", value: avgQueries.toLocaleString(), icon: Zap,      color: "text-amber-400   bg-amber-500/10"   },
    { label: "Docs Processed",      value: totalDocs,                   icon: FileText,  color: "text-blue-400    bg-blue-500/10"    },
    { label: "Active Tenants",      value: activeCnt,                   icon: Globe,     color: "text-emerald-400 bg-emerald-500/10" },
    { label: "Avg. Storage Use",    value: `${avgUsage}%`,              icon: Shield,    color: "text-violet-400  bg-violet-500/10"  },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Usage insights and trends across all tenants</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={16} />
            </div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Queries per Tenant</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ANALYTICS_QUERIES} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="queries" name="Queries" radius={[6, 6, 0, 0]}>
                {ANALYTICS_QUERIES.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 ? "#6366f1" : i === 1 ? "#7c3aed" : "#8b5cf6"}
                    opacity={1 - i * 0.07}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={PLAN_DISTRIBUTION}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={80}
                paddingAngle={3} dataKey="value"
              >
                {PLAN_DISTRIBUTION.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9", fontSize: 12 }}
              />
              <Legend formatter={v => <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trends */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-5">Document & Query Trends</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left"  tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend formatter={v => <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span>} />
            <Line yAxisId="left"  type="monotone" dataKey="queries" name="Queries"   stroke="#6366f1" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="docs"    name="Documents" stroke="#a78bfa" strokeWidth={2} dot={false} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
