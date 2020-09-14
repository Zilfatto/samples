import React, { Component } from 'react';
import UserContext from './userContext';
import MovieRow from './MovieRow';
import Login from './Login';
// Context in class component
class MovieList extends Component {
  // First way for setting context
  static contextType = UserContext;

  // Using context in lifecycle methods
  componentDidMount() {
    console.log("context", this.context);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ currentUser }) => (
          <div>
            Movie List - {currentUser ? currentUser.name : ''}
            <MovieRow />
            <Login />
          </div>
        )}
      </UserContext.Consumer>

      // Or like that

      // <div>
      //   {this.context.name}
      // </div>
    );
  }
}

// Second way for setting context
MovieList.contextType = UserContext;

export default MovieList;