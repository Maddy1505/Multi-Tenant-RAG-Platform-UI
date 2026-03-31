import { Bell } from "lucide-react";

export default function Navbar({ page, sidebarWidth }) {
  return (
    <div
      className="fixed top-0 right-0 h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6 z-20 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Breadcrumb */}
      <div className="text-sm text-slate-400">
        <span className="text-slate-600">/</span>{" "}
        <span className="text-slate-200 capitalize font-medium">{page}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button className="relative w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-white">Admin</div>
            <div className="text-xs text-slate-500">admin@docmind.ai</div>
          </div>
        </div>
      </div>
    </div>
  );
}
