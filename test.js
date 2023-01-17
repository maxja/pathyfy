const { getFlatObject } = require('./index')
const { describe, it } = require('mocha');
const { assert } = require('chai');
const _ = require('lodash')

describe('Object to flat array', () => {
    const originObj = {
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

    const expectedArray = [
        { 'a.b.c': 1 },
        { 'a.b.d': 2 },
        { 'a.b.g.k': null },
        { 'a.b.g.l': [ 'foo', 'bar' ] },
        { 'a.b.o': 'foo' },
        { 'a.m': 'bar' },
        { 'a.e': [ 123, 123 ] },
        { n: 'bar' },
        { f: 'foo' },
    ];

    describe('Should convert object to flat array', () => {
        const result = getFlatObject(originObj);
        for (let i = 0; i < result.length; i++) {

            const element = result[i];
            
            it(`Array element should be equal ${JSON.stringify(expectedArray[i])}`, () => {
                assert.equal(_.isEqual(element, expectedArray[i]), true)
            });
        }
    });
});
