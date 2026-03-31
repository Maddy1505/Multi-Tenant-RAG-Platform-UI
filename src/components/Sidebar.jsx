import { Settings, Menu, ChevronRight, Cpu } from "lucide-react";
import { NAV_ITEMS } from "../utils/navigation";

export default function Sidebar({ active, onNav, collapsed, onToggle }) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-30 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Cpu size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-lg tracking-tight">DocMind</span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
              {!collapsed && isActive && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="border-t border-slate-800 p-3 space-y-1">
        {!collapsed && (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        )}
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <Menu size={18} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );
}
