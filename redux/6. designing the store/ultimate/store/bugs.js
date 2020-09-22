import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs.splice(index, 1)
    }
  }
});

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
export default slice.reducer;

// Selector ( takes state and return computed state  )
// For expensive logics. to get the result right from the cache
// Memoization (Optimazing expensive functions)
// f(x) => y   Cache  -  { input: 1, output: 2 }

// bugs => get unresolved bugs from the cache (cached array)

export const selectUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
)