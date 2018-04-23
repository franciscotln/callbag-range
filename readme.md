# callbag-range

Callbag source that creates a range of numbers `from: number` (inclusive) `to: number` (inclusive).
An optional step can be passed as 3rd argument (1 by default).

`npm install callbag-range`

## Examples

### Generate the English alphabet
```js
const { forEach, map, pipe } = require('callbag-basics');
const range = require('callbag-range');

pipe(
  range(97, 122),
  map(String.fromCharCode),
  forEach((v) => {
    console.log(v); // a, b, c, ..., z
  })
);
```

### Decreasing range from 10 to 0
```js
const { forEach, pipe } = require('callbag-basics');
const range = require('callbag-range');

pipe(
  range(10, 0, -1),
  forEach((v) => {
    console.log(v); // 10, 9, 8, ..., 0
  })
);
```
