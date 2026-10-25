/**
 * Example feed with problems on purpose, used by the "Load example" button.
 * Row 2: empty price. Row 3: duplicate id. Row 4: price is not a number.
 * Row 5: image is not a URL.
 */
export const SAMPLE_CSV = `id,title,price,link,image_link
SKU-001,Running shoe,59.90,https://shop.example/p/sku-001,https://shop.example/img/sku-001.jpg
SKU-002,Trail shoe,,https://shop.example/p/sku-002,https://shop.example/img/sku-002.jpg
SKU-001,Running shoe (copy),59.90,https://shop.example/p/sku-001b,https://shop.example/img/sku-001.jpg
SKU-004,Socks,free,https://shop.example/p/sku-004,https://shop.example/img/sku-004.jpg
SKU-005,Cap,19.90,https://shop.example/p/sku-005,sku-005.jpg
`;
