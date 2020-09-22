import React from 'react';
import Bugs from './components/Bugs';
import BugsList from './components/BugsList';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './App.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Bugs />
    </Provider>
  );
}

export default App;
