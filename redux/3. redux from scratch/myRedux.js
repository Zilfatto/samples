export function createMyStore(reducer) {
  let state;
  const listeners = [];

  return {
    getListeners: listeners,
    dispatch: (action) => {
      state = reducer(state, action);
      if (listeners.length > 0) listeners.forEach((listener) => listener());
    },
    getState: () => state,
    subscribe: (listener) => {
      const number = listeners.push(listener);
      return () => listeners.splice(number - 1, 1, () => { });
    }
  };
}