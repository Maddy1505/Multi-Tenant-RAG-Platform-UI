const PLAN_COLORS = {
  Enterprise: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Pro:        "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  Starter:    "text-slate-300  bg-slate-500/10  border-slate-500/20",
};

export default function PlanBadge({ plan }) {
  const cls = PLAN_COLORS[plan] || PLAN_COLORS.Starter;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}>
      {plan}
    </span>
  );
}
