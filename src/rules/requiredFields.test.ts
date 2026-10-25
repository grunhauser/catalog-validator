import { describe, expect, it } from 'vitest';
import { requiredFields } from './requiredFields';

const complete = {
  id: 'SKU-001',
  title: 'Running shoe',
  price: '59.90',
  link: 'https://shop.example/p/sku-001',
  image_link: 'https://shop.example/img/sku-001.jpg',
};

const fieldsOf = (row: Record<string, string>) =>
  requiredFields(row, 2, [row]).map((issue) => issue.field);

describe('requiredFields', () => {
  it('returns no issues when every required field has a value', () => {
    expect(requiredFields(complete, 1, [complete])).toEqual([]);
  });

  it('returns one error for each missing or empty field', () => {
    expect(fieldsOf({ id: 'SKU-002', title: 'Trail shoe', price: '' })).toEqual([
      'price',
      'link',
      'image_link',
    ]);
  });

  it('treats a value with only spaces as empty', () => {
    expect(fieldsOf({ ...complete, price: '   ' })).toEqual(['price']);
  });

  it('puts the row number and field name in the issue', () => {
    const [issue] = requiredFields({ ...complete, title: '' }, 7, []);
    expect(issue).toEqual({
      row: 7,
      field: 'title',
      rule: 'required-fields',
      severity: 'error',
      message: 'title is missing',
    });
  });
});
