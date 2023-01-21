import { traverse } from './index.js';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('Test traverse function', () => {
  describe('Success tests', () => {
    const testCases = [
      [
        { a: 'b' },
        [['a', 'b']],
        'unpack single key:value object'
      ],
      [
        { a: 'b', c: 'd' },
        [['a', 'b'], ['c', 'd']],
        'unpack double key:value object'
      ],
      [
        { a: { b: 'c' }, d: { e: 'f' } },
        [['a.b', 'c'], ['d.e', 'f']],
        'unpack nested key:value object'
      ],
      [
        { a: { b: ['c', 'd', 'e'] } },
        [['a.b', ['c', 'd', 'e']]],
        'preserve array as whole value while unpacking'
      ],
      [
        { a: { b: null } },
        [['a.b', null]],
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
          ['a.b', 'c'],
          ['a.d.e', undefined],
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
