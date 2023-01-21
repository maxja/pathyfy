'use strict';

/**
 * Traverse object
 * @param {Object} obj
 * @param {boolean} unpackArray [false]
 */
export function* traverse(obj, unpackArray = false) {
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }
  if (obj instanceof Array && !unpackArray) {
    return null;
  }
  const objectRefRegistry = new WeakSet([obj]);
  const queue = Object.entries(obj);
  for (; queue.length > 0;) {
    const [key, value] = queue.shift();
    if (
      typeof value !== 'object' || value === null
      || (value instanceof Array && !unpackArray)
    ) {
      yield [key, value];
      continue;
    }
    if (objectRefRegistry.has(value)) {
      yield [key, undefined];
      continue;
    }
    objectRefRegistry.add(value);
    Reflect.apply(
      Array.prototype.push,
      queue,
      Object.entries(value).map(([k, v]) => ([[key, k].join('.'), v])),
    );
  }
  return null;
}

/**
 * Get Flat Object
 * @param {object} obj
 */
export function getFlatObject(obj) {
  return [...traverse(obj)].map((kv) => Object.fromEntries([kv]));
}
