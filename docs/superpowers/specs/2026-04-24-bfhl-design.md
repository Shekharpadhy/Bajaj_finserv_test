# BFHL Full Stack Design — SRM Engineering Challenge

## Identity

| Field | Value |
|---|---|
| user_id | shekharpadhy_06112005 |
| email_id | sp8270@srmist.edu.in |
| college_roll_number | RA2311026010603 |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (single deploy, one base URL)
- **Language**: JavaScript (Node.js)

## Architecture

```
Bajaj_finserv_test/
├── app/
│   ├── api/bfhl/route.js     # POST /bfhl graded endpoint
│   ├── page.jsx              # Single-page frontend
│   ├── layout.jsx
│   └── globals.css
├── components/
│   ├── InputPanel.jsx        # Textarea + Submit
│   ├── ResultPanel.jsx       # Orchestrates result display
│   ├── HierarchyCard.jsx     # Per-tree/cycle card
│   ├── TreeVisual.jsx        # Recursive tree renderer
│   └── SummaryCard.jsx       # Stats summary
├── lib/
│   ├── constants.js          # Hardcoded identity fields
│   ├── parser.js             # Validation + dedup logic
│   └── graph.js              # Tree build, cycle detect, depth
├── next.config.mjs           # CORS headers
└── tailwind.config.js
```

## API Specification

**Endpoint**: `POST /bfhl`  
**Content-Type**: `application/json`

### Input
```json
{ "data": ["A->B", "A->C", "B->D"] }
```

### Output
```json
{
  "user_id": "shekharpadhy_06112005",
  "email_id": "sp8270@srmist.edu.in",
  "college_roll_number": "RA2311026010603",
  "hierarchies": [...],
  "invalid_entries": [...],
  "duplicate_edges": [...],
  "summary": { "total_trees": 1, "total_cycles": 0, "largest_tree_root": "A" }
}
```

## Processing Rules (from spec)

### Validation (parser.js)
- Trim whitespace before validation
- Valid format: `X->Y` where X and Y are single uppercase A–Z
- Invalid: non-uppercase, multi-char nodes, wrong separator, self-loops (`A->A`), missing child, empty string
- Regex: `/^[A-Z]->[A-Z]$/`

### Deduplication (parser.js)
- Track seen edges in a Set; first occurrence wins
- Subsequent duplicates go into `duplicate_edges` (once each, regardless of repetition count)

### Tree Construction (graph.js)
1. Build adjacency list from valid non-duplicate edges
2. Find roots: nodes that never appear as a child
3. Handle diamond/multi-parent: first-encountered parent edge wins; discard subsequent parent edges for that child
4. Pure cycles (no external root): use lexicographically smallest node as root
5. Use Union-Find or DFS to group nodes into connected components

### Cycle Detection (graph.js)
- DFS with visited/recursion-stack tracking
- If cycle found: `{ root, tree: {}, has_cycle: true }` — no depth field
- If no cycle: `{ root, tree: {...}, depth: N }` — no has_cycle field

### Depth Calculation (graph.js)
- Depth = node count on longest root-to-leaf path
- Computed via recursive DFS

### Summary (graph.js)
- `total_trees`: count of non-cyclic hierarchies
- `total_cycles`: count of cyclic hierarchies
- `largest_tree_root`: root with greatest depth; tiebreak = lexicographically smaller root

## Frontend Design

- Dark-themed professional UI
- Textarea for comma or newline separated node input
- Submit button with loading spinner
- Per-hierarchy cards with color-coded cycle/tree badges
- Recursive tree visual with indentation lines
- Summary stats bar
- Clear error state if API fails

## Phases

| Phase | Scope |
|---|---|
| 1 | Project setup: Next.js 14, Tailwind, CORS config |
| 2 | Core logic: parser.js + graph.js with all edge cases |
| 3 | API route: route.js wiring lib functions |
| 4 | Frontend: all components, dark UI |
| 5 | Polish: loading, errors, responsive, edge-case UI |
| 6 | Deploy: Vercel |

## CORS
Set via `next.config.mjs` headers: `Access-Control-Allow-Origin: *` on `/api/bfhl`.
