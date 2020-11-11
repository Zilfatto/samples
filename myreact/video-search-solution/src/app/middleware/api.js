import axios from 'axios';
import * as actions from '../apiActions';
import { apiEndPoint, apiKey } from '../../config.json';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: apiEndPoint,
      url,
      method,
      params: {
        part: 'snippet',
        key: apiKey,
        type: 'video',
        maxResults: 12,
        ...data
      }
    });
    // Genera;
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;