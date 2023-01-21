import { traverse } from './index.js';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('Test traverse function', () => {
  describe('Success tests', () => {
    const testCases = [
      [
        { a: 'b' },
        [[['a', 'b'], [0]]],
        'unpack single key:value object'
      ],
      [
        { a: 'b', c: 'd' },
        [[['a', 'b'], [0]], [['c', 'd'], [1]]],
        'unpack double key:value object'
      ],
      [
        { a: { b: 'c' }, d: { e: 'f' } },
        [[['a.b', 'c'], [0, 0]], [['d.e', 'f'], [1, 0]]],
        'unpack nested key:value object'
      ],
      [
        { a: { b: ['c', 'd', 'e'] } },
        [[['a.b', ['c', 'd', 'e']], [0, 0]]],
        'preserve array as whole value while unpacking'
      ],
      [
        { a: { b: null } },
        [[['a.b', null], [0, 0]]],
        'preserve null as value while unpacking'
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

  describe('Test on circular referencing', () => {
    var selfReferenced = {
      a: {
        b: 'c',
        d: {
          e: undefined,
        },
      },
    };
    selfReferenced.a.d.e = selfReferenced;
    const testCases = [
      [
        selfReferenced,
        [
          [['a.b', 'c'], [0, 0]],
          [['a.d.e', undefined], [0, 1, 0]],
        ],
        'traverse should be prevented on circular referenced objects'
      ]
    ];

    for (const [asserted, expected, desc] of testCases) {
      it(desc, () => {
        assert.deepEqual([...traverse(asserted)], expected);
      });
    }
  });
});
