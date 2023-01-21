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

const result = [];

function getFlat(obj, parent) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];

      if (typeof element === 'object' && !Array.isArray(element) && element !== null) {
        let keyName = null;
        if (parent) {
          keyName = `${parent}.${key}`;
        }
        getFlat(element, keyName || key);
      } else if (!parent) {
        result.push({
          [key]: element
        });
      } else {
        const newFlatKeyName = `${parent}.${key}`;
        result.push({
          [newFlatKeyName]: element
        });
      }
    }
  }
}

export function getFlatObject(object) {
  getFlat(object);
  return result
}
