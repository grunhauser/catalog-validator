import type { Rule } from '../types/catalog';
// import { REQUIRED_FIELDS } from './fields';

/**
 * Rule "required-fields": every field in REQUIRED_FIELDS must exist in the row
 * and must not be empty (a value with only spaces counts as empty).
 * One issue per missing field, severity "error".
 *
 * TODO (Gustavo): first exercise. Write the body. The tests that describe
 * what it must do are in requiredFields.test.ts.
 */
export const requiredFields: Rule = (_row, _rowNumber) => {
  return [];
};
