"use client";
import { useState, useRef } from "react";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";

export default function Home() {
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  async function handleSubmit(data) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setResult(json);
      // Scroll to results on mobile
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err.message ?? "Unknown error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Nav ── */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 shadow-lg shadow-indigo-900/50">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white tracking-tight">BFHL</span>
              <span className="hidden sm:block text-slate-500 text-sm">Node Hierarchy Analyser</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <code className="hidden sm:block text-xs text-slate-600 font-mono bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              POST /bfhl
            </code>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Live
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="border-b border-slate-800/50"
        style={{ background: "linear-gradient(135deg, #0a0a14 0%, #0e0b1f 50%, #0a0a14 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-medium tracking-wide">
              SRM Engineering Challenge · Round 1
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Hierarchical Node{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Analyser
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            Submit directed edge relationships. The engine validates input, detects cycles,
            constructs hierarchical trees, and computes depth — in milliseconds.
          </p>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left — Input (sticky on desktop) */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-5 sm:p-6">
              <InputPanel onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>

          {/* Right — Results */}
          <div ref={resultsRef} className="scroll-mt-24">
            <ResultPanel result={result} error={error} loading={loading} />
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">SRM Full Stack Engineering Challenge · Round 1</p>
          <p className="text-xs text-slate-700 font-mono">
            shekharpadhy_06112005 &nbsp;·&nbsp; RA2311026010603
          </p>
        </div>
      </footer>
    </div>
  );
}
