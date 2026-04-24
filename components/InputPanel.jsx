"use client";
import { useState } from "react";

const PLACEHOLDER = `A->B, A->C, B->D, C->E, E->F
X->Y, Y->Z, Z->X
P->Q, Q->R
G->H, G->H, G->I
hello, 1->2, A->`;

export default function InputPanel({ onSubmit, loading }) {
  const [raw, setRaw] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!raw.trim()) return;
    // Accept comma or newline separated entries
    const data = raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit(data);
  }

  function handleExample() {
    setRaw("A->B, A->C, B->D, C->E, E->F, X->Y, Y->Z, Z->X, P->Q, Q->R, G->H, G->H, G->I, hello, 1->2, A->");
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌐</span>
          <h2 className="text-lg font-semibold text-white">Node Input</h2>
        </div>
        <p className="text-sm text-slate-400">
          Enter edges as <code className="text-indigo-400 font-mono bg-slate-800 px-1 py-0.5 rounded text-xs">X-&gt;Y</code> separated by commas or newlines.
          Each node must be a single uppercase letter (A–Z).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Textarea */}
        <div className="relative">
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={10}
            spellCheck={false}
            className="
              w-full font-mono text-sm bg-slate-900 border border-slate-700
              rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              resize-none transition-colors duration-200
              leading-relaxed
            "
          />
          <div className="absolute bottom-3 right-3 text-xs text-slate-600 font-mono select-none">
            {raw.split(/[\n,]+/).filter((s) => s.trim()).length} entries
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !raw.trim()}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40
              disabled:cursor-not-allowed text-white font-semibold
              py-3 px-6 rounded-xl transition-all duration-200
              shadow-lg shadow-indigo-900/40 hover:shadow-indigo-700/50
              active:scale-[0.98]
            "
          >
            {loading ? (
              <>
                <Spinner />
                Analysing…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyse Nodes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExample}
            className="
              px-4 py-3 rounded-xl border border-slate-700 text-slate-400
              hover:border-indigo-500 hover:text-indigo-400 text-sm font-medium
              transition-all duration-200 whitespace-nowrap
            "
          >
            Load Example
          </button>
        </div>
      </form>

      {/* Format guide */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Valid Format</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { ex: "A->B", ok: true,  label: "Single uppercase" },
            { ex: "AB->C", ok: false, label: "Multi-char node" },
            { ex: "1->2", ok: false, label: "Non-letter" },
            { ex: "A->A", ok: false, label: "Self-loop" },
            { ex: "A-B",  ok: false, label: "Wrong separator" },
            { ex: "A->",  ok: false, label: "Missing child" },
          ].map(({ ex, ok, label }) => (
            <div key={ex} className="flex items-center gap-2">
              <span className={`text-xs w-2 h-2 rounded-full flex-shrink-0 ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
              <code className={`font-mono text-xs ${ok ? "text-emerald-400" : "text-red-400"}`}>{ex}</code>
              <span className="text-xs text-slate-600 truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
