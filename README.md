# pambda-headers

[Pambda](https://github.com/pambda/pambda) for manipulating headers.

## Installation

```
npm i pambda-headers
```

## Usage

``` javascript
const { compose, createLambda } = require('pambda');
const { addHeaders } = require('pambda-headers');

export.handler = createLambda(
  compose(
    addHeaders({
      foo: 'bar',
    }),
  )
);
```
## License

MIT
