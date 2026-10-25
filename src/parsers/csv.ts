import Papa from 'papaparse';
import type { ParseResult, ProductRow } from '../types/catalog';

/**
 * Parses a CSV feed with a header row. Papa Parse handles the hard parts
 * (quoted values, commas inside quotes, line breaks) and detects the delimiter,
 * so feeds separated by ";" (common in Italy and Brazil) also work.
 */
export function parseCsv(text: string): ParseResult {
  const result = Papa.parse<ProductRow>(text.trim(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  // Papa reports some recoverable problems as errors; only stop on the
  // ones that mean we could not read the structure at all.
  const fatal = result.errors.find((e) => e.type === 'Delimiter' || e.type === 'Quotes');
  if (fatal) {
    return { ok: false, error: `Invalid CSV (row ${(fatal.row ?? 0) + 1}): ${fatal.message}` };
  }
  if (result.data.length === 0) {
    return { ok: false, error: 'The CSV has no product rows.' };
  }
  return { ok: true, rows: result.data };
}
