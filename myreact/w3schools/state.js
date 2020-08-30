// The state object is initialized in the constructor:
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: 'Ford' };
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      colour: 'red',
      year: 1964,
    };
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}

// Using the state Object
class Car extends React.Component {
  sonstructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      colour: 'red',
      year: 1964,
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.colour}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}

// Changing the state Object
// Add a button with an onClick event that will change the color property:
class Car extends React.Component {
  sonstructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      colour: 'red',
      year: 1964,
    };
  }
  changeColour = () => {
    this.setState({ colour: 'blue' });
  };
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.colour}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColour}>
          Change colour
        </button>
      </div>
    );
  }
}
