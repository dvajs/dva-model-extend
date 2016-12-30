export default function modelExtend(...models) {
  const base = {
    state: {},
    subscriptions: {},
    effects: {},
    reducers: {},
  };
  return models.reduce((acc, extend) => {
    acc.namespace = extend.namespace;
    if (typeof extend.state === 'object' && !Array.isArray(extend.state)) {
      Object.assign(acc.state, extend.state);
    } else if ('state' in extend) {
      acc.state = extend.state;
    }
    Object.assign(acc.subscriptions, extend.subscriptions);
    Object.assign(acc.effects, extend.effects);
    Object.assign(acc.reducers, extend.reducers);
    return acc;
  }, base);
};
