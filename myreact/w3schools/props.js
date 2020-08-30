import React from 'react';
import ReactDOM from 'react-dom';

const myElement = <Car brand="Ford" />;

class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

// Pass data
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
        <h1>Who lives in my garage!</h1>
        <Car brand="Ford" />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));

// Passing a variable
class Garage extends React.Component {
  render() {
    const carName = 'Ford';
    return (
      <div>
        <h1>Who lives in my garage?</h1>
        <Car brand={carName} />
      </div>
    );
  }
}

// Passing an object
class Garage extends React.Component {
  render() {
    const carInfo = { name: 'Ford', model: 'Mustang' };
    return (
      <div>
        <h1>Who lives in my garage?</h1>
        <Car brand={carInfo} />
      </div>
    );
  }
}

// Props in the constructor
// If your component has a constructor function, the props should always be passed to the constructor
// and also to the React.Component via the super() method.
class Car extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2>I am a {this.props.model}!</h2>;
  }
}
