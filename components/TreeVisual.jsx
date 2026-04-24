"use client";

export default function TreeVisual({ tree, depth = 0 }) {
  if (!tree || typeof tree !== "object") return null;

  const entries = Object.entries(tree);
  if (entries.length === 0) return null;

  return (
    <ul className={depth === 0 ? "" : "ml-5 mt-1 border-l border-indigo-900/60"}>
      {entries.map(([node, children]) => {
        const hasChildren = children && Object.keys(children).length > 0;
        return (
          <li key={node} className="relative pt-1">
            {/* Connector line */}
            {depth > 0 && (
              <span className="absolute left-[-20px] top-[14px] w-4 border-t border-indigo-900/60" />
            )}
            <div className="flex items-center gap-2 group">
              {/* Node bubble */}
              <span className="
                flex items-center justify-center w-7 h-7 rounded-full
                bg-indigo-600/20 border border-indigo-500/40
                text-indigo-300 font-mono font-semibold text-sm
                group-hover:bg-indigo-600/40 group-hover:border-indigo-400
                transition-colors duration-150 flex-shrink-0
              ">
                {node}
              </span>
              {hasChildren && (
                <span className="text-xs text-slate-600">
                  → {Object.keys(children).join(", ")}
                </span>
              )}
            </div>
            {hasChildren && (
              <TreeVisual tree={children} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
