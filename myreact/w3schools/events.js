import React from 'react';
import ReactDOM from 'react-dom';

// React
// <button onClick={shoot}>Take the Shot!</button>
// HTML
// <button onclick="shoot()">Take the Shot!</button>

// Event handlers
class Football extends React.Component {
  shoot() {
    alert('Great shot!');
  }
  render() {
    return <button onClick={this.shoot}>Take the Shot!</button>;
  }
}

// Bind "this"
// For methods in React, the this keyword should represent the component that owns the method.
class Football extends React.Component {
  shoot = () => {
    alert(this);
    /*
    The 'this' keyword refers to the component object
    */
  };
  render() {
    return <button onClick={this.shoot}>Take the Shot!</button>;
  }
}

// Why Arrow functions?
// In class components, the this keyword is not defined by default,
// so with regular functions the this keyword represents the object that called the method,
// which can be the global window object, a HTML button, or whatever.

// If you must use regular functions instead of arrow functions you have to bind this
// to the component instance using the bind() method:
class Football extends React.Component {
  constructor(props) {
    super(props);
    this.shoot = this.shoot.bind(this);
  }
  shoot() {
    alert(this);
    /*
    Thanks to the binding in the constructor function,
    the 'this' keyword now refers to the component object
    */
  }
  render() {
    return <button onClick={this.shoot}>Take the shot!</button>;
  }
}

// Passing arguments
// 1. Make an anonymous arrow function:
class Football extends React.Component {
  shoot = (a) => {
    alert(a);
  };
  render() {
    return <button onClick={() => this.shoot('Goal')}>Take the shot!</button>;
  }
}
// 2. Bind the event handler to this
class Football extends React.Component {
  shoot(a) {
    alert(a);
  }
  render() {
    return (
      <button onClick={this.shoot.bind(this, 'Goal')}>Take the shot!</button>
    );
  }
}

// React event object
// Event handlers have access to the React event that triggered the function.
class Football extends React.Component {
  shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  };
  render() {
    return (
      <button onClick={(ev) => this.shoot('Goal', ev)}>Take the shot!</button>
    );
  }
}
// Without arrow function, the React event object is sent automatically as the last argument when using the bind() method:
class Football extends React.Component {
  shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  };
  render() {
    return (
      <button onClick={this.shoot.bind(this, 'Goal')}>Take the shot!</button>
    );
  }
}
