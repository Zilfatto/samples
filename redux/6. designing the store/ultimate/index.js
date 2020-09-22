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

// "Unsubscribe" is important, if a user nabigated away from the current page
// where there won't be that component. 
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

store.dispatch(teamMemberAdded({ name: 'John' }));
store.dispatch(teamMemberAdded({ name: 'Frank' }));
store.dispatch(teamMemberAdded({ name: 'Mike' }));


store.dispatch(projectAdded({ name: 'Project 2' }));
store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(projectAdded({ name: 'Project 3' }));


store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));
store.dispatch(bugAdded({ description: 'Bug 3' }));


store.dispatch(assignedBug({ memberId: 1, bugId: 1 }));
store.dispatch(assignedBug({ memberId: 1, bugId: 2 }));
store.dispatch(assignedBug({ memberId: 1, bugId: 3 }));

store.dispatch(assignedBug({ memberId: 2, bugId: 2 }));
store.dispatch(assignedBug({ memberId: 3, bugId: 3 }));


store.dispatch(bugResolved({ id: 1 }));


store.dispatch(projectRemoved({ id: 1 }));

unsubscribe();

console.log(selectUnresolvedBugs(store.getState()));
console.log(selectMemberAssignedBugs(2)(store.getState()));