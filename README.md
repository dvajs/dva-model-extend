# dva-model-extend

[![](https://img.shields.io/travis/dvajs/dva-model-extend.svg?style=flat-square)](https://travis-ci.org/dvajs/dva-model-extend)
[![npm package](https://img.shields.io/npm/v/dva-model-extend.svg?style=flat-square)](https://www.npmjs.org/package/dva-model-extend)
[![NPM downloads](http://img.shields.io/npm/dm/dva-model-extend.svg?style=flat-square)](https://npmjs.org/package/dva-model-extend)
[![Dependency Status](https://david-dm.org/dvajs/dva-model-extend.svg?style=flat-square)](https://david-dm.org/dvajs/dva-model-extend)

Utility method to extend dva model.

## Installation

```bash
npm install --save dva-model-extend
```

## Usage

````js
import modelExtend from 'dva-model-extend';

const human = {
  state: {
    stomach: null,
  },
  reducers: {
    eat(state, { payload: food }) {
      return { ...state, stomach: food };
    },
  },
};

const benjy = modelExtend(human, {
  namespace: 'human.benjy',
  state: {
    name: 'Benjy',
  },
});
````

## License

MIT
