import { describe, expect, it } from 'vitest';
import { detectFormat, parseFeed } from './index';

describe('detectFormat', () => {
  it('detects JSON by the first character', () => {
    expect(detectFormat('  [{"id":"1"}]')).toBe('json');
    expect(detectFormat('{"products":[]}')).toBe('json');
  });
  it('falls back to CSV', () => {
    expect(detectFormat('id,title\n1,Shoe')).toBe('csv');
  });
});

describe('parseFeed', () => {
  it('parses a JSON array and turns values into strings', () => {
    const r = parseFeed('[{"id": 1, "price": 9.9, "image": null}]');
    expect(r).toEqual({ ok: true, rows: [{ id: '1', price: '9.9', image: '' }] });
  });

  it('accepts { products: [...] }', () => {
    const r = parseFeed('{"products": [{"id": "A"}]}');
    expect(r.ok && r.rows).toEqual([{ id: 'A' }]);
  });

  it('reports invalid JSON', () => {
    const r = parseFeed('[{"id": }]');
    expect(r.ok).toBe(false);
  });

  it('parses CSV with quotes and semicolons', () => {
    const r = parseFeed('id;title;price\n1;"Shoe; red";10,90\n');
    expect(r).toEqual({ ok: true, rows: [{ id: '1', title: 'Shoe; red', price: '10,90' }] });
  });

  it('reports an empty feed', () => {
    expect(parseFeed('   ').ok).toBe(false);
  });
});
