import type { Issue, ProductRow, Rule } from '../types/catalog';
import { requiredFields } from './requiredFields';

/**
 * All active rules. To add a rule: write it in its own file, then add it here.
 * Planned next: duplicate ids, price format, image/link URL format.
 */
export const rules: Rule[] = [requiredFields];

/** Runs every rule on every row and returns all issues, in row order. */
export function validateFeed(feed: ProductRow[], activeRules: Rule[] = rules): Issue[] {
  return feed.flatMap((row, i) => activeRules.flatMap((rule) => rule(row, i + 1, feed)));
}
