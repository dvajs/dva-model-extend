# dva-model-extend

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
