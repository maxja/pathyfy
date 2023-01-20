import { traverse } from './index.js';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('Test underlying traverse function generator', () => {
  describe('Success tests', () => {
    const testCases = [
      [
        { a: 'b' },
        [['a', 'b']],
        'single key:value object'
      ],
      [
        { a: 'b', c: 'd' },
        [['a', 'b'], ['c', 'd']],
        'double key:value object'
      ],
      [
        { a: { b: 'c' }, d: { e: 'f' } },
        [['a.b', 'c'], ['d.e', 'f']],
        'nested key:value object'
      ],
      [
        { a: { b: ['c', 'd', 'e'] } },
        [['a.b', ['c', 'd', 'e']]],
        'preserve array as whole value'
      ],
      [
        { a: { b: null } },
        [['a.b', null]],
        'preserve null as value'
      ],
    ];

    for (const [asserted, expected, desc] of testCases) {
      it(desc, () => {
        assert.deepEqual([...traverse(asserted)], expected);
      });
    }
  });
  describe('Fail tests', () => {
    const testCases = [
      [
        null,
        [],
        'null should not treated as object'
      ],
      [
        [1, 2, 3],
        [],
        'array should not treaded by default as pathable object'
      ],
    ];
    for (const [asserted, expected, desc] of testCases) {
      it(desc, () => {
        assert.deepEqual([...traverse(asserted)], expected);
      });
    }
  });
});
