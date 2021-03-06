// Action types
const BUG_ADDED = 'bugAdded';
const BUG_RESOLVED = 'bugResolved';
const BUG_REMOVED = 'bugRemoved';

// Action creators
export function bugAdded(description) {
  return {
    type: BUG_ADDED,
    payload: {
      description
    }
  };
}

export function bugResolved(id) {
  return {
    type: BUG_RESOLVED,
    payload: {
      id
    }
  };
}

export function bugRemoved(id) {
  return {
    type: BUG_REMOVED,
    payload: {
      id
    }
  };
}


// Reducer
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false
        }
      ];

    case BUG_RESOLVED:
      return state.map(bug =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    case BUG_REMOVED:
      return state.filter(bug => bug.id !== action.payload.id);

    default:
      return state;
  }
}