import { combineReducers } from 'redux';
import chequeModalReducer from '../features/chequeModal/chequeModalSlice';
import chequesReducer from '../features/cheques/ChequesSlice';

export default combineReducers({
  chequeModal: chequeModalReducer,
  cheques: chequesReducer
});