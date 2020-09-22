import React from 'react';
import Bugs from './components/Bugs';
import configureStore from './store/configureStore';
import StoreContext from './contexts/storeContext';
import './App.css';

const store = configureStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}

export default App;
