import { Building2, FileText, MessageSquare, DollarSign, TrendingUp, Upload, Users, RefreshCw, Star } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import MetricCard from "../components/MetricCard";
import PlanBadge from "../components/PlanBadge";
import { MOCK_ACTIVITY, TREND_DATA } from "../data/mockData";
import { formatCurrency } from "../utils/formatters";

export default function DashboardPage({ tenants }) {
  const totalDocs    = tenants.reduce((a, t) => a + t.docs,    0);
  const totalQueries = tenants.reduce((a, t) => a + t.queries, 0);
  const totalRevenue = tenants.reduce((a, t) => a + t.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Building2}    label="Total Tenants" value={tenants.length}                   change="12%" changeType="up" color="bg-violet-500/15 text-violet-400" />
        <MetricCard icon={FileText}     label="Documents"     value={totalDocs.toLocaleString()}        change="8%"  changeType="up" color="bg-indigo-500/15 text-indigo-400" />
        <MetricCard icon={MessageSquare} label="Total Queries" value={totalQueries.toLocaleString()}   change="23%" changeType="up" color="bg-blue-500/15 text-blue-400" />
        <MetricCard icon={DollarSign}   label="MRR"           value={formatCurrency(totalRevenue)}     change="5%"  changeType="up" color="bg-emerald-500/15 text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recent Activity</h2>
            <button className="text-xs text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
          <div className="space-y-4">
            {MOCK_ACTIVITY.map(item => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.type === "upload" ? "bg-indigo-500/15 text-indigo-400" :
                  item.type === "query"  ? "bg-violet-500/15 text-violet-400" :
                                           "bg-emerald-500/15 text-emerald-400"
                }`}>
                  {item.type === "upload" ? <Upload size={14} /> :
                   item.type === "query"  ? <MessageSquare size={14} /> :
                                            <Users size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200">{item.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-violet-400">{item.tenant}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tenants */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Top Tenants</h2>
            <Star size={14} className="text-amber-400" />
          </div>
          <div className="space-y-4">
            {[...tenants]
              .sort((a, b) => b.queries - a.queries)
              .slice(0, 5)
              .map((t, i) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-600 w-4">{i + 1}</span>
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300">
                    {t.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.queries.toLocaleString()} queries</div>
                  </div>
                  <PlanBadge plan={t.plan} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-white">Revenue Trend</h2>
            <p className="text-xs text-slate-400 mt-1">Monthly recurring revenue over the last 12 months</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={12} /> +18.2% YoY
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={TREND_DATA}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9" }} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
