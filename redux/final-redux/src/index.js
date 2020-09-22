import configureStore from './store/configureStore';
import { projectAdded, projectRemoved } from './store/projects';
import { userAdded } from './store/users';
import {
  selectUnresolvedBugs,
  selectBugsByUser,
  loadBugs,
  addBug,
  resolveBug,
  assignBugToUser
} from './store/bugs';

const store = configureStore();

store.dispatch(userAdded({ name: 'Jack' }));

store.dispatch(loadBugs());

store.dispatch(addBug({ description: 'Some new bug' }));

setTimeout(() => store.dispatch(resolveBug(1600621365008)), 2000);

setTimeout(() => store.dispatch(resolveBug(1600621268876)), 5000);

setTimeout(() => store.dispatch(assignBugToUser({ userId: 3, bugId: 1600621268876 })), 10000);

setTimeout(() => store.dispatch(loadBugs()), 6000);

const bugs = selectBugsByUser(1)(store.getState());

store.dispatch({
  type: 'error',
  payload: { message: 'An error occurred.' }
});