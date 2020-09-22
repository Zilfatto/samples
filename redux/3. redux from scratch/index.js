import store, { myStore } from './store';
import * as actions from './actions';
// "Unsubscribe" is important, if a user nabigated away from the current page
// where there won't be that component. 
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

store.dispatch(actions.bugAdded('Bug 1'));

store.dispatch(actions.bugResolved(1));

unsubscribe();

store.dispatch(actions.bugRemoved(1));

console.log(store);

console.log(store.getState());



// const unsubscribe1 = myStore.subscribe(() => {
//   console.log('first');
// });

// const unsubscribe2 = myStore.subscribe(() => {
//   console.log('second');
// });

// unsubscribe1();

// const unsubscribe3 = myStore.subscribe(() => {
//   console.log('third');
// });

// unsubscribe2();

// myStore.dispatch(actions.bugAdded('Bug 1'));

// myStore.dispatch(actions.bugResolved(1));

// unsubscribe3();

// myStore.dispatch(actions.bugRemoved(1));

// console.log(myStore);

// console.log(myStore.getState());