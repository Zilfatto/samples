import * as actionTypes from './actionTypes';

export function bugAdded(description) {
  return {
    type: actionTypes.BUG_ADDED,
    payload: {
      description
    }
  };
}

export function bugRemoved(id) {
  return {
    type: actionTypes.BUG_REMOVED,
    payload: {
      id
    }
  };
}

export function bugResolved(id) {
  return {
    type: actionTypes.BUG_RESOLVED,
    payload: {
      id
    }
  };
}