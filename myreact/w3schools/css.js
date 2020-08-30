import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Inline styling
// To style an element with the inline style attribute, the value must be a JavaScript object:
class MyHeader extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: 'red' }}>Hello Style!</h1>
        <p>Add a little style!</p>
      </div>
    );
  }
}

// camelCased property names
class MyHeader extends Component {
  render() {
    return (
      <div>
        <h1 style={{ backgroundColor: 'lightblue' }}>Hello Style!</h1>
        <p>Add a little style!</p>
      </div>
    );
  }
}

// JavaScript Object
// You can also create an object with styling information, and refer to it in the style attribute:
class MyHeader extends Component {
  render() {
    const myStyle = {
      color: 'white',
      backgroundColor: 'DodgerBlue',
      padding: '10px',
      fontFamily: 'Arial',
    };
    return (
      <div>
        <h1 style={myStyle}>Hello Style!</h1>
        <p>Add a little style!</p>
      </div>
    );
  }
}

// CSS stylesheet
// You can write your CSS styling in a separate file, just save the file with the .css file extension, and import it in your application.
// App.css
body {
  background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Arial;
  text-align: center;
}
// index.js
import './App.css';

class MyHeader extends Component {
  render() {
    return (
      <div>
        <h1>Hello Style!</h1>
        <p>Add a little style.</p>
      </div>
    );
  }
}


// CSS modules
// Another way of adding styles to your application is to use CSS Modules.

// CSS Modules are convenient for components that are placed in separate files.

// The CSS inside a module is available only for the component that imported it,
// and you do not have to worry about name conflicts.

// mystyle.module.css
.bigblue {
  color: DodgerBlue;
  padding: 40px;
  font-family: Arial;
  text-align: center;
}
// Import the stylesheet in your component:

// App.js
import styles from './mystyle.module.css';

class Car extends Component {
  render() {
    return <h1 className={styles.bigblue}>Hello Car!</h1>
  }
}
export default Car;
// Import the component in your application:

// index.js
import Car from './App.js';

ReactDOM.render(<Car />, document.getElementById('root'));