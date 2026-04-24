// Valid edge: single uppercase letter -> single uppercase letter, no self-loops
const VALID_EDGE_RE = /^[A-Z]->[A-Z]$/;

/**
 * Parses raw data array into:
 *   validEdges   – [{parent, child}] deduplicated, order-preserved
 *   invalidEntries – strings that failed validation
 *   duplicateEdges – duplicate edge strings (once each)
 */
export function parseInput(data) {
  if (!Array.isArray(data)) {
    return { validEdges: [], invalidEntries: [], duplicateEdges: [] };
  }

  const invalidEntries = [];
  const duplicateEdges = [];
  const validEdges = [];
  const seenEdges = new Set();
  const seenDuplicates = new Set();

  for (const raw of data) {
    if (typeof raw !== "string") {
      invalidEntries.push(String(raw));
      continue;
    }

    const entry = raw.trim();

    // Validation
    if (!VALID_EDGE_RE.test(entry)) {
      invalidEntries.push(raw);
      continue;
    }

    const [parent, child] = entry.split("->"); // both single chars guaranteed by regex

    // Self-loop check (regex already blocks A->A but be explicit)
    if (parent === child) {
      invalidEntries.push(raw);
      continue;
    }

    // Duplicate check
    if (seenEdges.has(entry)) {
      if (!seenDuplicates.has(entry)) {
        duplicateEdges.push(entry);
        seenDuplicates.add(entry);
      }
      continue;
    }

    seenEdges.add(entry);
    validEdges.push({ parent, child });
  }

  return { validEdges, invalidEntries, duplicateEdges };
}
