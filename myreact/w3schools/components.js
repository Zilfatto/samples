import React from 'react';
import ReactDOM, { render } from 'react-dom';

// Class component
Class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}

ReactDOM.render(<Car />, document.getElementById('root'));


// Function component
function Car() {
  return <h2>Hi, I am also a Car!</h2>;
}

ReactDOM.render(<Car />, document.getElementById('root'));


// Component constructor
// If there is a constructor() function in your component, this function will be called when the component gets initiated.
// The constructor function is where you initiate the component's properties.
class Car extends React.Component {
  constructor() {
    super();
    this.state = { colour: 'red' };
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}
// Colour property in render()
class Car extends React.Component {
  constructor() {
    super();
    this.state = { colour: 'red' };
  }
  render() {
    return <h2>I am a {this.state.colour} Car!</h2>;
  }
}

// Props
class Car extends React.Component {
  render() {
    return <h2> I am a {this.props.colour} Car!</h2>;
  }
}
ReactDOM.render(<Car colour="red" />, document.getElementById('root'));


// Components in components
class Car extends React.Component {
  render() {
    return <h2>I am a Car!</h2>;
  }
}
class Garage extends React.Component {
  render() {
    return (
      <div>
        <h1>Who lives in my Garage?</h1>
        <Car />
      </div>
    );
  }
}
ReactDOM.render(<Garage />, document.getElementById('root'));


// Components in Files
// This is the new file, we named it "App.js":
import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
export default Car;

// In "index.js"
import React from 'react';
import ReactDOM from 'react-dom';
import Car from './App.js';

ReactDOM.render(<Car />, document.getElementById('root'));