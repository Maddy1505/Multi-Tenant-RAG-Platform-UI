const STATUS_CONFIG = {
  active:     { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", label: "Active"     },
  suspended:  { color: "text-amber-400  bg-amber-400/10  border-amber-400/20",  label: "Suspended"  },
  trial:      { color: "text-blue-400   bg-blue-400/10   border-blue-400/20",   label: "Trial"      },
  processed:  { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", label: "Processed" },
  pending:    { color: "text-amber-400  bg-amber-400/10  border-amber-400/20",  label: "Pending"    },
  processing: { color: "text-blue-400   bg-blue-400/10   border-blue-400/20",   label: "Processing" },
};

export default function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {c.label}
    </span>
  );
}
