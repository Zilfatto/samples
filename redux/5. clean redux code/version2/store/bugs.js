import { createAction, createReducer } from '@reduxjs/toolkit';

// Action types
const BUG_ADDED = 'bugAdded';
const BUG_RESOLVED = 'bugResolved';
const BUG_REMOVED = 'bugRemoved';

// Action creators
export const bugAdded = (description) => createAction(BUG_ADDED)({ description });
export const bugResolved = (id) => createAction(BUG_RESOLVED)({ id });
export const bugRemoved = (id) => createAction(BUG_REMOVED)({ id });


// Reducer
let lastId = 0;

export default createReducer([], {
  [BUG_ADDED]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false
    });
  },

  [BUG_RESOLVED]: (bugs, action) => {
    const index = bugs.findIndex(bug => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },

  [BUG_REMOVED]: (bugs, action) => {
    const index = bugs.findIndex(bug => bug.id === action.payload.id);
    bugs.splice(index, 1)
  }
});