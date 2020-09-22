import configureStore from './store/configureStore';
import { projectAdded, projectRemoved } from './store/projects';
import { bugAdded, bugResolved, bugRemoved, selectUnresolvedBugs } from './store/bugs';

const store = configureStore();
// "Unsubscribe" is important, if a user nabigated away from the current page
// where there won't be that component. 
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});


store.dispatch(projectAdded({ name: 'Project 2' }));

store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(projectAdded({ name: 'Project 3' }));

store.dispatch(projectRemoved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));

unsubscribe();

console.log(selectUnresolvedBugs(store.getState()));