# srweb.abcd

Javascript library for matrix optics and gaussian beam calculations.

Depands on [Math JS library](http://mathjs.org/).

Usage examples:

```js
// new gaussian beam with infinite radius of curvature, 1mm waist diameter and 530 nm wavelength
var q = new GaussianBeam(Infinity, 1e-3, 530e-9); 

// propogation through arbitrary abcd matrix
var q1 = q.propogate([[a,b], [c,d]]); // new q value after arbitrary abcd matrix
```

```js
// array of optical elements divided by free space
var elements = [
    {x: 0.5, abcd: ThinLens(0.1)},
    {x: 0.2, abcd: ThinLens(0.2)},
    {x: 0.7, abcd: ThinLens(0.1)},
]

// coordinates for beam propogation calculations
var x = d3.range(0, 1, 1/800);

var q = new GaussianBeam(Infinity, 1e-3);

// data will contain beam waists for every x
var data = q.goThrough(elements, x);
```
