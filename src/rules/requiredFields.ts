import type { Issue, Rule } from '../types/catalog';
import { REQUIRED_FIELDS } from './fields';

/**
 * Rule "required-fields": every field in REQUIRED_FIELDS must exist in the row
 * and must not be empty (a value with only spaces counts as empty).
 * One issue per missing field, severity "error".
 */
export const requiredFields: Rule = (row, rowNumber) => {
  const msg: Issue[] = [];
  REQUIRED_FIELDS.forEach((field) => {
    // A field that was not sent is undefined: treat it like an empty string.
    const value = row[field] || '';
    if (!value.trim()) {
      msg.push({
        row: rowNumber,
        field,
        rule: 'required-fields',
        severity: 'error',
        message: field + ' is missing',
      });
    }
  });
  return msg;
};
