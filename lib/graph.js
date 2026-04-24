/**
 * Builds hierarchies array + summary from parsed valid edges.
 *
 * Rules enforced:
 *  - Diamond/multi-parent: first-encountered parent edge wins; later ones silently dropped.
 *  - Cycle detection: DFS with recursion-stack tracking.
 *  - Pure cycles (all nodes are children): lex-smallest node is root.
 *  - Depth = node count on longest root-to-leaf path.
 *  - largest_tree_root tiebreak: lex-smaller root wins.
 */
export function buildHierarchies(validEdges) {
  // ── 1. Build adjacency + child-parent maps respecting multi-parent rule ──
  const children = {};   // parent -> [child, ...]
  const parentOf = {};   // child -> parent (first-encountered wins)
  const allNodes = new Set();

  for (const { parent, child } of validEdges) {
    allNodes.add(parent);
    allNodes.add(child);

    if (!children[parent]) children[parent] = [];

    // Multi-parent rule: if child already has a parent, discard this edge
    if (parentOf[child] !== undefined) continue;

    parentOf[child] = parent;
    children[parent].push(child);
  }

  // ── 2. Group nodes into connected components (undirected) ──
  const visited = new Set();
  const components = [];

  for (const node of allNodes) {
    if (visited.has(node)) continue;
    const component = [];
    dfsCollect(node, children, parentOf, visited, component);
    components.push(component);
  }

  // ── 3. For each component, find root & detect cycle ──
  const hierarchies = [];

  for (const component of components) {
    const nodeSet = new Set(component);

    // Root = node in component that has no parent, OR is not a child of any node in component
    const roots = component.filter(
      (n) => parentOf[n] === undefined || !nodeSet.has(parentOf[n])
    );

    let root;
    if (roots.length > 0) {
      // Multiple roots possible only in disconnected sense; pick lex smallest
      root = roots.sort()[0];
    } else {
      // Pure cycle — no external root
      root = [...component].sort()[0];
    }

    const hasCycle = detectCycle(root, children, nodeSet);

    if (hasCycle) {
      hierarchies.push({ root, tree: {}, has_cycle: true });
    } else {
      const tree = buildTree(root, children);
      const depth = calcDepth(root, children);
      hierarchies.push({ root, tree, depth });
    }
  }

  // Sort hierarchies so the output order is deterministic (by root lex)
  // but keep original insertion order per spec — only sort within tiebreak logic
  // Actually spec shows output in input-encounter order, so keep as-is.

  // ── 4. Summary ──
  const trees = hierarchies.filter((h) => !h.has_cycle);
  const cycles = hierarchies.filter((h) => h.has_cycle);

  let largest_tree_root = null;
  if (trees.length > 0) {
    const best = trees.reduce((acc, h) => {
      if (h.depth > acc.depth) return h;
      if (h.depth === acc.depth && h.root < acc.root) return h;
      return acc;
    });
    largest_tree_root = best.root;
  }

  const summary = {
    total_trees: trees.length,
    total_cycles: cycles.length,
    largest_tree_root,
  };

  return { hierarchies, summary };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function dfsCollect(node, children, parentOf, visited, component) {
  if (visited.has(node)) return;
  visited.add(node);
  component.push(node);

  // Traverse children
  for (const child of children[node] || []) {
    dfsCollect(child, children, parentOf, visited, component);
  }
  // Traverse parent (to catch cycles that span components)
  const parent = parentOf[node];
  if (parent !== undefined) {
    dfsCollect(parent, children, parentOf, visited, component);
  }
}

function detectCycle(root, children, nodeSet) {
  const visitedNodes = new Set();
  const recStack = new Set();

  function dfs(node) {
    visitedNodes.add(node);
    recStack.add(node);

    for (const child of children[node] || []) {
      if (!nodeSet.has(child)) continue;
      if (!visitedNodes.has(child)) {
        if (dfs(child)) return true;
      } else if (recStack.has(child)) {
        return true;
      }
    }

    recStack.delete(node);
    return false;
  }

  // Also check all nodes in component in case root isn't connected to cycle
  for (const node of nodeSet) {
    if (!visitedNodes.has(node)) {
      if (dfs(node)) return true;
    }
  }

  return false;
}

function buildTree(node, children) {
  return { [node]: buildSubtree(node, children) };
}

function buildSubtree(node, children) {
  const result = {};
  for (const child of children[node] || []) {
    result[child] = buildSubtree(child, children);
  }
  return result;
}

function calcDepth(node, children) {
  const kids = children[node] || [];
  if (kids.length === 0) return 1;
  return 1 + Math.max(...kids.map((c) => calcDepth(c, children)));
}
