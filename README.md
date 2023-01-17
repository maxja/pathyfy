# obj-to-flat
A simple package that converts an object to a flat array

# Usage
```js
const { getFlatObject } = require('obj-to-flat');

const originObj = {
    a: {
        b: {
            c: 1,
            d: 2,
            g: {
                k: null,
                l: ['qwe', 'qwe']
            },
            o: 'qwe'
        },
        m: 'asd',
        e: [123, 123],
    },
    n: 'zxc',
    f: 'qwe',
};

const faltArray = getFlatObject(getFlatObject);
/* Result faltArray
* [
*   { 'a.b.c': 1 },
*   { 'a.b.d': 2 },
*   { 'a.b.g.k': null },
*   { 'a.b.g.l': [ 'foo', 'bar' ] },
*   { 'a.b.o': 'foo' },
*   { 'a.m': 'bar' },
*   { 'a.e': [ 123, 123 ] },
*   { n: 'bar' },
*   { f: 'foo' },
* ];
*/
```