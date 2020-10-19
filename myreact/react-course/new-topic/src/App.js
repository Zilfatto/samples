import React, { Component, Fragment, useState } from 'react';
import Counter from './hooks/Counter2';
import './App.css';
import Comp from './Comp';
import MoviePage from './context/MoviePage';
import UserContext from './context/userContext';
import CartContext from './context/cartContext';

// function App() {
//   const [count, setCount] = useState(1);

//   return (
//     <Fragment>
//       {count && <Counter />}
//       <Comp />
//       <button onClick={() => setCount(0)}>Delete</button>
//     </Fragment>
//   );
// }

class App extends Component {
  state = {
    currentUser: null
  };

  handleLoggedIn = (username) => {
    console.log('Getting the user: ' + username);
    const user = { name: 'Carl ' };
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <CartContext.Provider value={{ cart: [] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn
          }}
        >
          <div>
            <MoviePage />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;