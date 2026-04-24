"use client";
import TreeVisual from "./TreeVisual";

export default function HierarchyCard({ hierarchy, index }) {
  const { root, tree, depth, has_cycle } = hierarchy;

  return (
    <div
      className="
        rounded-2xl border bg-slate-900/70 backdrop-blur-sm overflow-hidden
        animate-fade-in-up
        transition-all duration-300 hover:border-indigo-500/40
      "
      style={{
        borderColor: has_cycle ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.2)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{
          borderColor: has_cycle ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.12)",
          background: has_cycle
            ? "linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 100%)"
            : "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Root node badge */}
          <span
            className="
              flex items-center justify-center w-9 h-9 rounded-xl
              font-mono font-bold text-base
            "
            style={{
              background: has_cycle
                ? "rgba(239,68,68,0.15)"
                : "rgba(99,102,241,0.2)",
              color: has_cycle ? "#f87171" : "#a5b4fc",
              border: `1.5px solid ${has_cycle ? "rgba(239,68,68,0.4)" : "rgba(99,102,241,0.4)"}`,
            }}
          >
            {root}
          </span>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Root Node</p>
            <p className="text-white font-semibold font-mono">{root}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {has_cycle ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Cycle Detected
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Valid Tree
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
                depth {depth}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tree body */}
      <div className="px-5 py-4">
        {has_cycle ? (
          <div className="flex items-center gap-3 py-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-red-300 font-medium">Cyclic Dependency</p>
              <p className="text-xs text-slate-500 mt-0.5">This group contains a circular reference. No tree structure can be built.</p>
            </div>
          </div>
        ) : (
          <div className="min-h-[40px]">
            <TreeVisual tree={tree} depth={0} />
          </div>
        )}
      </div>
    </div>
  );
}
