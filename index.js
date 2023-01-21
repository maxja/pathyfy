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
  for (let idx = 0; queue.length > 0; idx++) {
    const [key, value, i] = queue.shift();
    let ids = i ?? [];
    ids.push(idx);
    if (
      typeof value !== 'object' || value === null
      || (value instanceof Array && !unpackArray)
    ) {
      yield [[key, value], ids];
      continue;
    }
    if (objectRefRegistry.has(value)) {
      yield [[key, undefined], ids];
      continue;
    }
    objectRefRegistry.add(value);
    Reflect.apply(
      Array.prototype.push,
      queue,
      Object.entries(value).map(
        ([k, v]) => ([[key, k].join('.'), v, ids])
      ),
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
