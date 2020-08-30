import React from 'react';
import ReactDOM from 'react-dom';
// Lifecycle of Components
// The three phases are: Mounting, Updating, and Unmounting.

// --- MOUNTING ---
// Mounting means putting elements into the DOM.

// 1. constructor()
// 2. getDerivedStateFromProps()
// 3. render()
// 4. componentDidMount()

// ### constructor ###
// The constructor() method is called before anything else, when the component is initiated,
// and it is the natural place to set up the initial state and other initial values.

// The constructor() method is called with the props, as arguments, and you should always start by calling
// the super(props) before anything else, this will initiate the parent's constructor method and
// allows the component to inherit methods from its parent (React.Component).
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  render() {
    return <h1>My favourite colour is {this.state.favoriteColour}</h1>;
  }
}

// ### getDerivedStateFromProps ###
// The getDerivedStateFromProps() method is called right before rendering the element(s) in the DOM.

// This is the natural place to set the state object based on the initial props.

// It takes state as an argument, and returns an object with changes to the state.

// The example below starts with the favorite color being "red", but the getDerivedStateFromProps() method updates
// the favorite color based on the favcol attribute:
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  static getDerivedStateFromProps(props, state) {
    return { favouriteColour: props.favcol };
  }
  render() {
    return <h1>My favourite colour is {this.state.favoriteColor}</h1>;
  }
}

// ### render ###
class Header extends React.Component {
  render() {
    return <h1>This is the content of the Header component</h1>;
  }
}

// ### componentDidMount ###
// The componentDidMount() method is called after the component is rendered.
// This is where you run statements that requires that the component is already placed in the DOM.
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favouriteColour: 'yellow' });
    }, 1000);
  }
  render() {
    return <h1>My favourite colour is {this.state.favoriteColour}</h1>;
  }
}

// --- UPDATING ---
// The next phase in the lifecycle is when a component is updated.
// A component is updated whenever there is a change in the component's state or props.

// 1. getDerivedStateFromProps()
// 2. shouldComponentUpdate()
// 3. render()
// 4. getSnapshotBeforeUpdate()
// 5. componentDidUpdate()

// ### getDerivedStateFromProps ###
// Also at updates the getDerivedStateFromProps method is called.
// This is the first method that is called when a component gets updated.
// This is still the natural place to set the state object based on the initial props.
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  static getDerivedStateFromProps(props, state) {
    return { favouriteColour: props.favcol };
  }
  changeColour = () => {
    this.setState({ favouriteColour: 'blue' });
  };
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <button type="button" onClick={this.changeColour}>
          Change colour
        </button>
      </div>
    );
  }
}

// ### shouldComponentUpdate ###
// In the shouldComponentUpdate() method you can return
// a Boolean value that specifies whether React should continue with the rendering or not.
// The default value is true.
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  shouldComponentUpdate() {
    return false;
  }
  changeColour = () => {
    this.setState({ favouriteColour: 'blue' });
  };
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <button type="button" onClick={this.changeColour}>
          Change colour
        </button>
      </div>
    );
  }
}
// Same example as above, but this time the shouldComponentUpdate() method returns true instead:
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  shouldComponentUpdate() {
    return true;
  }
  changeColour = () => {
    this.setState({ favouriteColour: 'blue' });
  };
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <button type="button" onClick={this.changeColour}>
          Change colour
        </button>
      </div>
    );
  }
}

// ###  render ###
// The render() method is of course called when a component gets updated,
// it has to re-render the HTML to the DOM, with the new changes.
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  changeColour = () => {
    this.setState({ favouriteColour: 'blue' });
  };
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <button type="button" onClick={this.changeColour}>
          Change colour
        </button>
      </div>
    );
  }
}

// ### getSnapshotBeforeUpdate ###
// In the getSnapshotBeforeUpdate() method you have access to the props and state before the update,
// meaning that even after the update, you can check what the values were before the update.
// If the getSnapshotBeforeUpdate() method is present, you should also include
// the componentDidUpdate() method, otherwise you will get an error.
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favouriteColour: 'yellow' });
    }, 1000);
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById(
      'div1'
    ).innerText = `Before the update, the favourite was ${prevState.favouriteColour}`;
  }
  componentDidUpdate() {
    document.getElementById(
      'div2'
    ).innerText = `The updated favourite is ${this.state.favouriteColour}`;
  }
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

// componentDidUpdate
// The componentDidUpdate method is called after the component is updated in the
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favouriteColour: 'red' };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favouriteColour: 'yellow' });
    }, 1000);
  }
  componentDidUpdate() {
    document.getElementById(
      'mydiv'
    ).innerText = `The updated favourite is ${this.state.favouriteColour}`;
  }
  render() {
    return (
      <div>
        <h1>My favourite colour is {this.state.favouriteColour}</h1>
        <div id="mydiv"></div>
      </div>
    );
  }
}

// --- UNMOUNTING ---
// The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.

// 1. componentWillUnmount()

// ### componentWillUnmount ###
// The componentWillUnmount method is called when the component is about to be removed from the DOM.
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }
  delHeader = () => {
    this.setState({ show: false });
  };
  render() {
    let myHeader;
    if (this.state.show) {
      myHeader = <Child />;
    }
    return (
      <div>
        {myHeader}
        <button type="button" onClick={this.delHeader}>
          Delete Header
        </button>
      </div>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    alert('The component named Header is about to be unmounted.');
  }
  render() {
    return <h1>Hello World!</h1>;
  }
}
