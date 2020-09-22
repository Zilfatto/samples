import configureStore from './store/configureStore';
import { projectAdded, projectRemoved } from './store/projects';
import { teamMemberAdded, assignedBug, selectMemberAssignedBugs } from './store/teamMember';
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  selectUnresolvedBugs
} from './store/bugs';

const store = configureStore();

// Without redux/toolkit, just pure redux
// const store = createStore(reducer, applyMiddleware(logger));


store.dispatch((dispatch, getState) => {
  // Call API
  // When the promise is resolved => dispatch()
  dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
  // If the promise is rejected => dispatch()
});

store.dispatch({
  type: 'error',
  payload: { message: 'An error occurred.' }
});