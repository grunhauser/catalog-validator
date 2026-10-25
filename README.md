# Catalog validator

Paste or upload an e-commerce product feed (CSV or JSON) and see, row by row,
which products would be rejected by a marketplace or a search/recommendation
tool: missing fields, empty prices, duplicate ids, broken links.

Live: https://grunhauser.github.io/catalog-validator/ (after the first deploy)

## Why

When a shop sends its catalog to a search engine, a marketplace or Google
Shopping, a few bad rows can silently drop products from the site. I worked on
the front-end integration of a product search/recommendation platform where
catalog quality was a daily problem. This tool catches the common mistakes
before the feed is sent.

Everything runs in the browser. The feed is never uploaded.

## Stack

Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Vitest,
Papa Parse for CSV. Deployed to GitHub Pages with GitHub Actions.

## How it works

```
text ──parseFeed()──> ProductRow[] ──validateFeed(rules)──> Issue[] ──> UI
```

| Folder | What it does |
| --- | --- |
| `src/types/catalog.ts` | Shared types: `ProductRow`, `Issue`, `Rule` |
| `src/parsers/` | CSV and JSON text → rows (all values kept as strings) |
| `src/rules/` | One file per validation rule, registered in `rules/index.ts` |
| `src/composables/useFeedValidation.ts` | Feed text → rows, issues and counts (all `computed`) |
| `src/components/` | Input, summary cards, issues table |

A rule is a plain function, so it is easy to test without the UI:

```ts
type Rule = (row: ProductRow, rowNumber: number, feed: ProductRow[]) => Issue[];
```

## Rules

- [x] `required-fields`: id, title, price, link, image_link present and not empty
- [ ] `duplicate-id`: the same id appears in more than one row
- [ ] `price-format`: price is a positive number (accepts `10.90` and `10,90`)
- [ ] `url-format`: link and image_link are absolute http(s) URLs

## Run locally

```bash
npm install
npm run dev    # http://localhost:5173/catalog-validator/
npm test       # unit tests
npm run build
```
