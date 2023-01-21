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
  const refRegistry = new WeakSet([obj]);
  const queue = Object.entries(obj).map(
    ([k, v], i) => ([k, v, [i]])
  );
  for (; queue.length > 0;) {
    const [key, value, ids] = queue.shift();
    if (
      typeof value !== 'object'
      || value === null
      || (value instanceof Array && !unpackArray)
    ) {
      yield [[key, value], ids];
      continue;
    }
    if (refRegistry.has(value)) {
      yield [[key, undefined], ids];
      continue;
    }
    refRegistry.add(value);
    Reflect.apply(
      Array.prototype.push,
      queue,
      Object.entries(value).map(
        ([k, v], i) => ([[key, k].join('.'), v, ids.concat([i])])
      ),
    );
  }
  return null;
}

/**
 * Get Flat Object
 * @param {object} obj
 */
export function getFlatObject(obj, preserveOrder = true) {
  let res = [...traverse(obj)];
  if (preserveOrder) {
    res = res.sort(([, l], [, r]) => l > r ? +1 : r > l ? -1 : 0);
  }
  return res.map(
    ([kv,]) => Object.fromEntries([kv])
  );
}
