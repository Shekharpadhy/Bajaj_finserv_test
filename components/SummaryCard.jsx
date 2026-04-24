"use client";

export default function SummaryCard({ summary, invalidEntries, duplicateEdges }) {
  const stats = [
    {
      label: "Valid Trees",
      value: summary.total_trees,
      icon: "🌳",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Cycles",
      value: summary.total_cycles,
      icon: "🔄",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
    {
      label: "Largest Tree Root",
      value: summary.largest_tree_root ?? "—",
      icon: "👑",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      mono: true,
    },
    {
      label: "Invalid Entries",
      value: invalidEntries.length,
      icon: "⚠️",
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-5 animate-fade-in-up">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Summary</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border p-3 ${s.bg}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base leading-none">{s.icon}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
            <p className={`text-2xl font-bold ${s.mono ? "font-mono" : ""} ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Invalid entries */}
      {invalidEntries.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-2 font-medium">Invalid Entries</p>
          <div className="flex flex-wrap gap-1.5">
            {invalidEntries.map((e, i) => (
              <span key={i} className="font-mono text-xs px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300">
                {e || <span className="italic text-orange-500/60">empty</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Duplicate edges */}
      {duplicateEdges.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Duplicate Edges</p>
          <div className="flex flex-wrap gap-1.5">
            {duplicateEdges.map((e, i) => (
              <span key={i} className="font-mono text-xs px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300">
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
