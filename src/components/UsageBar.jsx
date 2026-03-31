export default function UsageBar({ value }) {
  const barColor =
    value > 80 ? "bg-red-400" :
    value > 60 ? "bg-amber-400" :
    "bg-violet-500";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-8 text-right">{value}%</span>
    </div>
  );
}
