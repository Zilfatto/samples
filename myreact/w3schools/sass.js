// Install Sass by running this command in your terminal:
// C:\Users\Your Name>npm install node-sass
// Now you are ready to include Sass files in your project!

// Create a Sass file
// Create a Sass file the same way as you create CSS files, but Sass files have the file extension .scss

// mysass.scss
$myColor: red;

h1 {
  color: $myColor;
}

// Import the Sass file the same way as you imported a CSS file:
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './mysass.scss';

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
ReactDOM.render(<MyHeader />, document.getElementById('root'));