import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;