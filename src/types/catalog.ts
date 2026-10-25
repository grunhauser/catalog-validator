/**
 * Core types shared by parsers, rules and UI.
 *
 * A feed is a list of rows. Each row is a plain object of strings, exactly as
 * it came from the file: we do not convert prices to numbers at parse time,
 * because "price is not a number" is one of the things we want to report.
 */

/** One product as read from the feed (column name -> raw value). */
export type ProductRow = Record<string, string>;

export type FeedFormat = 'csv' | 'json';

/** How bad a problem is. Errors usually make a product get rejected. */
export type Severity = 'error' | 'warning';

/** One problem found in one row. */
export interface Issue {
  /** Position of the row in the feed, starting at 1 (like a spreadsheet). */
  row: number;
  /** Column the problem is about, e.g. "price". */
  field: string;
  /** Id of the rule that found it, e.g. "required-fields". */
  rule: string;
  severity: Severity;
  /** Human readable explanation, shown in the table. */
  message: string;
}

/**
 * A validation rule.
 *
 * It receives one row, the row number (1-based) and the whole feed (some rules,
 * like duplicate ids, need to look at other rows). It returns the problems it
 * found in that row, or an empty array if the row is fine.
 */
export type Rule = (row: ProductRow, rowNumber: number, feed: ProductRow[]) => Issue[];

/** Result of turning text into rows. */
export type ParseResult =
  | { ok: true; rows: ProductRow[] }
  | { ok: false; error: string };
