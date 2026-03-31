import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";

import StatusBadge from "../components/StatusBadge";
import PlanBadge   from "../components/PlanBadge";
import UsageBar    from "../components/UsageBar";
import Modal       from "../components/Modal";

const FILTER_OPTIONS = ["all", "active", "suspended", "trial", "enterprise", "pro", "starter"];

export default function TenantsPage({ tenants, setTenants }) {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({ name: "", plan: "Starter", email: "" });

  const filtered = tenants.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      t.status === filter ||
      t.plan.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const addTenant = () => {
    if (!form.name.trim()) return;
    const newTenant = {
      id:      Date.now(),
      name:    form.name,
      plan:    form.plan,
      usage:   Math.floor(Math.random() * 30),
      status:  "trial",
      docs:    0,
      queries: 0,
      revenue: 0,
      joined:  new Date().toISOString().slice(0, 10),
    };
    setTenants(prev => [...prev, newTenant]);
    setForm({ name: "", plan: "Starter", email: "" });
    setShowModal(false);
  };

  const deleteTenant = (id) => setTenants(prev => prev.filter(t => t.id !== id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-sm text-slate-400 mt-1">{tenants.length} total tenants</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Tenant
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            placeholder="Search tenants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                {["Tenant", "Plan", "Usage", "Documents", "Queries", "Status", ""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center text-sm font-bold text-violet-300">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{t.name}</div>
                        <div className="text-xs text-slate-500">Since {t.joined}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><PlanBadge plan={t.plan} /></td>
                  <td className="px-4 py-3.5 min-w-32"><UsageBar value={t.usage} /></td>
                  <td className="px-4 py-3.5 text-sm text-slate-300">{t.docs}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-300">{t.queries.toLocaleString()}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => deleteTenant(t.id)}
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-slate-500 flex items-center justify-center transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No tenants found</div>
          )}
        </div>
      </div>

      {/* Add Tenant Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Tenant">
        <div className="space-y-4">
          {[
            { label: "Company Name", key: "name",  type: "text",  placeholder: "Acme Corp" },
            { label: "Contact Email", key: "email", type: "email", placeholder: "admin@company.com" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Plan</label>
            <select
              value={form.plan}
              onChange={e => setForm(prev => ({ ...prev, plan: e.target.value }))}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
            >
              {["Starter", "Pro", "Enterprise"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addTenant}
              className="flex-1 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Add Tenant
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
