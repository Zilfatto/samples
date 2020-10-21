import * as actions from '../fakeApiActions';
import getData from './../../services/dataService';

const fakeApi = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    // make fale http request 
    const data = getData();
    // Genera;
    dispatch(actions.apiCallSuccess(data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: data });

  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default fakeApi;