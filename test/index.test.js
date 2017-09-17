'use strict';

const assert = require('assert');
const modelExtend = require('../lib').default;

describe('modelExtend', () => {
  it('should support multi inheritance', () => {
    function keyup() { }
    function* focus() { }
    function updateState() { }
    const res = modelExtend({
      subscriptions: {
        keyup,
      },
    }, {
        effects: {
          focus,
        },
      }, {
        namespace: 'test',
        state: {},
        reducers: {
          updateState,
        },
      });
    assert.deepEqual(res, {
      namespace: 'test',
      state: {},
      subscriptions: {
        keyup,
      },
      effects: {
        focus,
      },
      reducers: {
        updateState,
      },
    });
  });

  it('should merge states when they are objects', () => {
    const res = modelExtend({
      state: {
        name: 'Benjy',
      },
    }, {
        state: {
          age: 18,
        },
      });
    assert.deepEqual(res.state, {
      name: 'Benjy',
      age: 18,
    });
  });

  it('should override state when the last model.state is not an object', () => {
    const res = modelExtend({
      state: {
        name: 'Benjy',
      },
    }, {
        state: 18,
      });
    assert.strictEqual(res.state, 18);
  });

  it('should not treat array as object', () => {
    const res = modelExtend({
      state: {
        name: 'Benjy',
      },
    }, {
        state: [],
      });
    assert.ok(Array.isArray(res.state));
    assert.strictEqual(res.state.length, 0);
  });


  it('should print misinformation', () => {
    modelExtend(
      {
        state: {
          attr1: 10,
        },
      },
      {
        state: {
          attr1: 20,
        }
      },
      {
        state: 's'
      },
      {
        state: {
          attr1: 10,
        },
      },
      {
        state: 's',
        namespace: 'm1'
      },
    );
    modelExtend(
      {
        effects: {
          attr1: 10,
        },
      },
      {
        effects: {
          other: 20,
        }
      },

      {
        effects: {
          attr1: 30,
        }
      },
      {
        effects: {
          attr1: 20,
        },
        namespace: 'm2'
      },
    );
    modelExtend(
      {
        subscriptions: {
          attr1: 10,
        },
      },
      {
        subscriptions: {
          attr1: 20,
        }
      },
      {
        subscriptions: {
          attr1: 20,
        }
      },
      {
        subscriptions: {
          other: 30,
        },
        namespace: 'm3',
      },
    );
  });
});
