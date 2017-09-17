export default function modelExtend(...models) {
  const f = (arr, key, count) => {
    if (arr.indexOf(key) === -1) {
      arr.push(key);
    } else {
      !counts[count] && (counts[count] = {});
      counts[count][key] ? counts[count][key]++ : counts[count][key] = 1;
    }
  }
  const counts = {};
  const base = {
    state: {},
    subscriptions: {},
    effects: {},
    reducers: {},
  };
  let stateCache = [],
    namespaceCache = [],
    subscriptionsCache = [],
    effectsCache = [],
    reducersCache = [];

  const model = models.reduce((acc, extend) => {
    if (typeof extend.state === 'object' && !Array.isArray(extend.state)) {
      for (let key in extend.state) {
        f(stateCache, key, 'stateCount');
      }
    }
    for (let key in extend.subscriptions) {
      f(subscriptionsCache, key, 'subscriptionsCount');
    }
    for (let key in extend.effects) {
      f(effectsCache, key, 'effectsCount');
    }
    for (let key in extend.reducers) {
      f(reducersCache, key, 'reducersCount');
    }
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

  if (counts['stateCount']) {
    for (let key in counts['stateCount']) {
      console.warn(`model: ${model.namespace} state attr: ${key} be overwritten: ${counts['stateCount'][key]} time(s).`);
    }
  }
  if (counts['subscriptionsCount']) {
    for (let key in counts['subscriptionsCount']) {
      console.warn(`model: ${model.namespace} subscriptions attr: ${key} be overwritten: ${counts['subscriptionsCount'][key]} time(s).`);
    }
  }
  if (counts['effectsCount']) {
    for (let key in counts['effectsCount']) {
      console.warn(`model: ${model.namespace} effects attr: ${key} be overwritten: ${counts['effectsCount'][key]} time(s).`);
    }
  }
  if (counts['reducersCount']) {
    for (let key in counts['reducersCount']) {
      console.warn(`model: ${model.namespace} reducers attr: ${key} be overwritten: ${counts['reducersCount'][key]} time(s).`);
    }
  }
  return model;
};
