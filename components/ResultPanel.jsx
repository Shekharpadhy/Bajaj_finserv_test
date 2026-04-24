"use client";
import { useState } from "react";
import SummaryCard from "./SummaryCard";
import HierarchyCard from "./HierarchyCard";

export default function ResultPanel({ result, error, loading }) {
  const [showRaw, setShowRaw] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 animate-fade-in-up gap-4">
        <div className="relative flex items-center justify-center w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin" />
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-indigo-300 font-semibold text-sm">Analysing nodes…</p>
          <p className="text-slate-600 text-xs mt-1">Building hierarchies & detecting cycles</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-red-500/20 bg-red-500/5 animate-fade-in-up">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/15 mb-4">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-400 font-semibold mb-1">Request Failed</p>
        <p className="text-sm text-slate-500 text-center max-w-xs px-6">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-slate-800 text-slate-600">
        <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm font-medium">Results will appear here</p>
        <p className="text-xs text-slate-700 mt-1">Submit node edges to analyse hierarchies</p>
      </div>
    );
  }

  const { hierarchies, invalid_entries, duplicate_edges, summary } = result;

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">

      {/* Top bar — identity + raw toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-xs text-slate-400 font-mono truncate">{result.user_id}</span>
          <span className="text-slate-700 hidden sm:block">·</span>
          <span className="text-xs text-slate-500 font-mono hidden sm:block truncate">{result.email_id}</span>
        </div>
        <button
          onClick={() => setShowRaw((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 text-xs font-medium transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {showRaw ? "Visual View" : "Raw JSON"}
        </button>
      </div>

      {showRaw ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-auto max-h-[70vh]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <span className="text-xs text-slate-500 font-mono">POST /bfhl · 200 OK</span>
            <button
              onClick={() => navigator.clipboard?.writeText(JSON.stringify(result, null, 2))}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : (
        <>
          <SummaryCard
            summary={summary}
            invalidEntries={invalid_entries}
            duplicateEdges={duplicate_edges}
          />
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Hierarchies <span className="text-slate-700">({hierarchies.length})</span>
            </p>
            <div className="flex flex-col gap-4">
              {hierarchies.map((h, i) => (
                <HierarchyCard key={h.root + i} hierarchy={h} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
