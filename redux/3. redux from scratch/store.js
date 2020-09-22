import { createStore } from 'redux';
import reducer from './reducer';
import { createMyStore } from './myRedux';

const store = createStore(reducer);

export const myStore = createMyStore(reducer);

export default store;