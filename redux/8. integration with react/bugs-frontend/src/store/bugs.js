import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './apiActions';
import { bugsUrl, minutesForCachedData } from '../config.json';
import moment from 'moment';

// Reducer
const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list.splice(index, 1);
    }
  }
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;


// Action Creators
const url = bugsUrl;

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < minutesForCachedData) return;

  // if (lastFetch && (Date.now() - lastFetch < 360000)) return;

  return dispatch(apiCallBegan({
    url,
    onStart: slice.actions.bugsRequested.type,
    onSuccess: slice.actions.bugsReceived.type,
    onError: slice.actions.bugsRequestFailed.type
  }));
}

export const addBug = bug =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: slice.actions.bugAdded.type
  });

export const resolveBug = id =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: 'patch',
    data: { resolved: true },
    onSuccess: slice.actions.bugResolved.type
  });

export const assignBugToUser = ({ userId, bugId }) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: 'patch',
    data: { userId },
    onSuccess: slice.actions.bugAssignedToUser.type
  });


// Selector ( takes state and return computed state  )
// For expensive logics. to get the result right from the cache
// Memoization (Optimazing expensive functions)
// f(x) => y   Cache  -  { input: 1, output: 2 }
// bugs => get unresolved bugs from the cache (cached array)

export const selectUnresolvedBugs = createSelector(
  state => state.entities.bugs.list,
  bugs => bugs.filter(bug => !bug.resolved)
);

export const selectBugsByUser = userId => createSelector(
  state => state.entities.bugs.list,
  bugs => bugs.filter(bug => bug.userId === userId)
)