const logger = param => store => next => action => {
  // console.log(param.destination);
  return next(action);
};

export default logger;