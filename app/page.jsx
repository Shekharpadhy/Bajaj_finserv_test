"use client";
import { useState, useRef } from "react";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";
import USPCards from "@/components/USPCards";

export default function Home() {
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
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
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">

      {/* ── Ambient orbs ── */}
      <div className="orb w-[500px] h-[500px] top-[-200px] left-[-150px] opacity-20"
        style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)" }} />
      <div className="orb w-[400px] h-[400px] top-[30%] right-[-150px] opacity-15"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
      <div className="orb w-[300px] h-[300px] bottom-[10%] left-[20%] opacity-10"
        style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }} />

      {/* ── Nav ── */}
      <header className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative flex items-center justify-center w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-indigo-600 blur-md opacity-60" />
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-lg leading-none block">BFHL</span>
              <span className="text-slate-500 text-xs">Node Hierarchy Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <code className="hidden md:block text-xs text-slate-500 font-mono bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/8">
              POST /bfhl
            </code>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Live
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-14">

          {/* Badge */}
          <div className="flex mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              SRM Full Stack Engineering Challenge · Round 1
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 max-w-3xl">
            Analyse Node{" "}
            <span className="shimmer-text">Hierarchies</span>
            <br />in Milliseconds
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            Submit directed edges, get back validated trees, detected cycles, computed depths,
            and structured insights — through a single REST endpoint.
          </p>

          {/* 3D USP Cards */}
          <USPCards />
        </div>
      </section>

      {/* ── Analyser ── */}
      <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3">
            Live Analyser
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Input */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl glass p-5 sm:p-6">
              <InputPanel onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="scroll-mt-24">
            <ResultPanel result={result} error={error} loading={loading} />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Max Input Nodes", value: "50+" },
              { label: "Response Time", value: "<3s" },
              { label: "CORS", value: "Enabled" },
              { label: "Edge Cases", value: "All handled" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs text-slate-600">BFHL · SRM Engineering Challenge</span>
          </div>
          <p className="text-xs text-slate-700 font-mono">
            shekharpadhy_06112005 &nbsp;·&nbsp; RA2311026010603 &nbsp;·&nbsp; sp8270@srmist.edu.in
          </p>
        </div>
      </footer>
    </div>
  );
}
