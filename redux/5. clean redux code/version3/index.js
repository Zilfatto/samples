import configureStore from './store/configureStore';
import * as actions from './store/bugs';

const store = configureStore();
// "Unsubscribe" is important, if a user nabigated away from the current page
// where there won't be that component. 
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

store.dispatch(actions.bugAdded({ description: 'Bug 1' }));
store.dispatch(actions.bugAdded({ description: 'Bug 2' }));
store.dispatch(actions.bugAdded({ description: 'Bug 3' }));

store.dispatch(actions.bugResolved({ id: 2 }));

unsubscribe();

store.dispatch(actions.bugRemoved({ id: 1 }));

console.log(store);

console.log(store.getState());