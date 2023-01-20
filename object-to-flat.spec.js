import { getFlatObject } from './index.js';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('Split object into array of key:value pairs', () => {
  it('complex object without self reference', () => {
    const asserted = {
      a: {
        b: {
          c: 1,
          d: 2,
          g: {
            k: null,
            l: ['foo', 'bar']
          },
          o: 'foo'
        },
        m: 'bar',
        e: [123, 123],
      },
      n: 'bar',
      f: 'foo',
    };

    const expected = [
      { 'a.b.c': 1 },
      { 'a.b.d': 2 },
      { 'a.b.g.k': null },
      { 'a.b.g.l': ['foo', 'bar'] },
      { 'a.b.o': 'foo' },
      { 'a.m': 'bar' },
      { 'a.e': [123, 123] },
      { n: 'bar' },
      { f: 'foo' },
    ];

    for (let [i, keyVal] of getFlatObject(asserted).entries()) {
      assert.deepStrictEqual(keyVal, expected[i]);
    }
  });
});
