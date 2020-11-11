import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import api from './middleware/api';

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: 'Logged!' }),
      errorHandler,
      api
    ]
  });
};