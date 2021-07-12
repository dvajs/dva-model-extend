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

  it('should deeply merge states when they are objects', () => {
    const originalModel = {
      state: {
        user: {
          name: 'Benjy',
        }
      },
    }
    const res = modelExtend(originalModel);
    originalModel.state.user.name = 'Yuan';

    assert.deepEqual(res.state, {
      user: {
        name: 'Benjy',
      }
    });
  });

  it('should log 2 times of state overwritten log', () => {
    modelExtend({
      state: {
        name: 'Benjy',
      },
    }, {
        state: {
          name: 'Benjy',
        },
      }, {
        state: {
          name: 'Benjy',
        },
        namespace: 'test',
      });
  });

  it('should log 2 times of subscriptions overwritten log', () => {
    modelExtend({
      subscriptions: {
        name: 'Benjy',
      },
    }, {
        subscriptions: {
          name: 'Benjy',
        },
      }, {
        subscriptions: {
          name: 'Benjy',
        },
        namespace: 'test',
      });
  });

  it('should log 2 times of effects overwritten log', () => {
    modelExtend({
      effects: {
        name: 'Benjy',
      },
    }, {
        effects: {
          name: 'Benjy',
        },
      }, {
        effects: {
          name: 'Benjy',
        },
        namespace: 'test',
      });
  });

  it('should log 2 times of reducers overwritten log', () => {
    modelExtend({
      reducers: {
        name: 'Benjy',
      },
    }, {
        reducers: {
          name: 'Benjy',
        },
      }, {
        reducers: {
          name: 'Benjy',
        },
        namespace: 'test',
      });
  });

  it('should log all overwritten log', () => {
    modelExtend({
      subscriptions: {
        name: 'Benjy',
      },
    }, {
        subscriptions: {
          name: 'Benjy',
        },
      }, {
        subscriptions: {
          name: 'Benjy',
        },
        namespace: 'test',
      },
      {
        effects: {
          name: 'Benjy',
        },
      }, {
        effects: {
          name: 'Benjy',
        },
      }, {
        effects: {
          name: 'Benjy',
        },
        namespace: 'test',
      },
      {
        reducers: {
          name: 'Benjy',
        },
      }, {
        reducers: {
          name: 'Benjy',
        },
      }, {
        reducers: {
          name: 'Benjy',
        },
      }, {
        state: {
          name: 'Benjy',
        },
      }, {
        state: {
          name: 'Benjy',
        },
      }, {
        state: {
          name: 'Benjy',
        },
        namespace: 'test',
      });
  });
});
