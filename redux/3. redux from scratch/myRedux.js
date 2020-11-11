export function createMyStore(reducer) {
  let state;
  const listeners = [];

  return {
    getListeners: listeners,
    dispatch: function (action) {
      state = reducer(state, action);
      if (listeners.length > 0) listeners.forEach((listener) => listener());
    },
    getState: function () { return state; },
    subscribe: function (listener) {
      const number = listeners.push(listener);
      return () => listeners.splice(number - 1, 1, () => { });
    }
  };
}