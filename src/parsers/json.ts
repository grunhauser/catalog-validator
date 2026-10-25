import type { ParseResult, ProductRow } from '../types/catalog';

/**
 * Parses a JSON feed. Accepts either an array of products or an object with a
 * "products" array (a common shape for exported catalogs).
 * Every value is converted to a string so rules see the same shape as CSV.
 */
export function parseJson(text: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: `Invalid JSON: ${(e as Error).message}` };
  }

  const list = Array.isArray(data)
    ? data
    : (data as { products?: unknown })?.products;

  if (!Array.isArray(list)) {
    return { ok: false, error: 'Expected an array of products or { "products": [...] }.' };
  }

  const rows: ProductRow[] = [];
  for (const [i, item] of list.entries()) {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `Item ${i + 1} is not an object.` };
    }
    rows.push(toStringRow(item as Record<string, unknown>));
  }
  return { ok: true, rows };
}

function toStringRow(item: Record<string, unknown>): ProductRow {
  const row: ProductRow = {};
  for (const [key, value] of Object.entries(item)) {
    // null/undefined become "" so "missing" and "empty" look the same to rules.
    row[key] = value === null || value === undefined ? '' : String(value);
  }
  return row;
}
