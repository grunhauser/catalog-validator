import { describe, expect, it } from 'vitest';
import type { Rule } from '../types/catalog';
import { validateFeed } from './index';

describe('validateFeed', () => {
  it('runs every rule on every row with 1-based row numbers', () => {
    const alwaysFails: Rule = (_row, rowNumber) => [
      { row: rowNumber, field: 'x', rule: 'test', severity: 'warning', message: 'm' },
    ];
    const issues = validateFeed([{}, {}], [alwaysFails]);
    expect(issues.map((i) => i.row)).toEqual([1, 2]);
  });

  it('returns nothing for an empty feed', () => {
    expect(validateFeed([])).toEqual([]);
  });
});
