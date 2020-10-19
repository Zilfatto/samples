import { toast } from 'react-toastify';

const errorHundler = state => next => action => {
  if (action.type === 'error') {
    const { response } = action.payload.error;
    const expectedError =
      response &&
      response.status >= 400 &&
      response.status < 500;

    if (!expectedError)
      toast.error('An unexpected error occurred.');
  }
  else return next(action);
};

export default errorHundler;