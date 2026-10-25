import type { FeedFormat, ParseResult } from '../types/catalog';
import { parseCsv } from './csv';
import { parseJson } from './json';

/** Guesses the format from the first non-space character. */
export function detectFormat(text: string): FeedFormat {
  const first = text.trimStart()[0];
  return first === '[' || first === '{' ? 'json' : 'csv';
}

export function parseFeed(text: string, format: FeedFormat = detectFormat(text)): ParseResult {
  if (text.trim() === '') return { ok: false, error: 'The feed is empty.' };
  return format === 'json' ? parseJson(text) : parseCsv(text);
}
