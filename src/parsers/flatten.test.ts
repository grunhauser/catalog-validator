import { describe, expect, it } from 'vitest';
import { flatten } from './flatten';

describe('flatten', () => {
  it('keeps a flat object as it is', () => {
    expect(flatten({ id: '1', title: 'Shoe' })).toEqual({ id: '1', title: 'Shoe' });
  });

  it('joins one nested level with a dot', () => {
    expect(flatten({ id: '1', price: { value: '10', currency: 'EUR' } })).toEqual({
      id: '1',
      'price.value': '10',
      'price.currency': 'EUR',
    });
  });

  it('handles deeper levels and arrays', () => {
    expect(flatten({ id: '1', stock: { store: { qty: 5 } }, tags: ['a', 'b'] })).toEqual({
      id: '1',
      'stock.store.qty': 5,
      'tags.0': 'a',
      'tags.1': 'b',
    });
  });

  it('keeps null leaves, so rules can report them as empty', () => {
    expect(flatten({ id: '1', image: null })).toEqual({ id: '1', image: null });
  });
});
