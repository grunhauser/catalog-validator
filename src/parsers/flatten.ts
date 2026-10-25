/**
 * Turns a nested object into a flat one whose keys are dot paths:
 *   { id: "1", price: { value: "10" }, tags: ["a"] }
 *   -> { id: "1", "price.value": "10", "tags.0": "a" }
 *
 * Arrays need no special case: Object.entries on an array returns the indexes
 * as keys. Leaves (anything that is not an object, including null) are stored
 * as they are.
 */
export function flatten(
  obj: object,
  prefix = '',
  result: Record<string, unknown> = {},
): Record<string, unknown> {
  const objArray = Object.entries(obj);
  objArray.forEach((objItems) => {
    const key = objItems[0];
    const value: unknown = objItems[1];
    if (typeof value === 'object' && value !== null) {
      // Branch: go one level deeper, same result object, longer path.
      const newPrefix = prefix + key + '.';
      flatten(value, newPrefix, result);
    } else {
      // Leaf: store it under its full path.
      result[prefix + key] = value;
    }
  });

  return result;
}
