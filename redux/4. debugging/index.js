import store from './store';
import * as actions from './actions';
// "Unsubscribe" is important, if a user nabigated away from the current page
// where there won't be that component. 
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

store.dispatch(actions.bugAdded('Bug 1'));
store.dispatch(actions.bugAdded('Bug 2'));

store.dispatch(actions.bugResolved(1));

unsubscribe();

store.dispatch(actions.bugRemoved(1));

console.log(store);

console.log(store.getState());