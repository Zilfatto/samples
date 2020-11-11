import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import VideoSearch from './features/videoSearch/VideoSearch';
import LoginForm from './components/LoginForm';
import Favourites from './features/favouriteSearches/FavouriteSearches';
import NotFound from './components/NotFound';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRouter';
import { Layout } from 'antd';
import { selectFavouriteSearches } from './features/favouriteSearches/favouriteSearchSlice'
import { selectUser } from './features/user/userSlice'
import { saveUserData } from './services/authService';
import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  const user = useSelector(selectUser);
  const favourites = useSelector(selectFavouriteSearches);
  const { Content } = Layout;

  useEffect(() => {
    // Save all the changes to the localStorage
    if (user.id) {
      saveUserData(user.id, favourites);
    }
  }, [user, favourites]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Layout className="mainLayout">
        {user.id && <NavBar />}
        <Content>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/favourites" component={Favourites} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute path="/" exact component={VideoSearch} />
            <Redirect to="/not-found" />
          </Switch>
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default App;
