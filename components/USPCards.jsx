"use client";

const USPS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
    border: "rgba(248,113,113,0.2)",
    title: "Cycle Detection",
    desc: "DFS recursion-stack algorithm instantly identifies circular dependencies across any node group.",
    tag: "Graph Theory",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    color: "#818cf8",
    glow: "rgba(129,140,248,0.15)",
    border: "rgba(129,140,248,0.2)",
    title: "Tree Construction",
    desc: "Builds multi-root hierarchies with diamond-node resolution — first-encountered parent edge always wins.",
    tag: "Data Structures",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.2)",
    title: "Depth Analysis",
    desc: "Computes longest root-to-leaf path for every tree. Ties broken lexicographically for deterministic results.",
    tag: "Algorithms",
  },
];

export default function USPCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {USPS.map((u, i) => (
        <div
          key={u.title}
          className="card-3d-wrapper"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div
            className="card-3d rounded-2xl p-6 flex flex-col gap-4 cursor-default animate-fade-in-up"
            style={{
              background: `linear-gradient(135deg, ${u.glow} 0%, rgba(255,255,255,0.02) 100%)`,
              border: `1px solid ${u.border}`,
              animationDelay: `${i * 120}ms`,
            }}
          >
            {/* Icon */}
            <div
              className="card-3d-icon flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ background: u.glow, color: u.color, border: `1px solid ${u.border}` }}
            >
              {u.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                style={{ background: u.glow, color: u.color, border: `1px solid ${u.border}` }}
              >
                {u.tag}
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">{u.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{u.desc}</p>
            </div>

            {/* Bottom shimmer line */}
            <div
              className="h-px w-full rounded-full mt-auto"
              style={{ background: `linear-gradient(90deg, transparent, ${u.color}40, transparent)` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
