import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice'

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={props => {
        if (!user.id)
          return (
            <Redirect to={{
              pathname: 'login',
            }} />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;