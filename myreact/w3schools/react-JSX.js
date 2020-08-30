import React from 'react';
import ReactDOM from 'react-dom';

// JSX
const myElement = <h1>I love JSX!</h1>;

ReactDOM.render(myElement, document.getElementById('root'));

// Without JSX
const myElement = React.createElement('h1', {}, 'I do not use JSX!');

ReactDOM.render(myElement, document.getElementById('root'));

// Expressions in JSX
const myELement = <h1>React is {5 + 5} times better with JSX</h1>;

// Inserting a large block of HTML
const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

// One top level element
const myElement = (
  <div>
    <h1>I am a Header.</h1>
    <h1>I am a Header too.</h1>
  </div>
);
// Or it is possible to use it
const myElement = (
  <React.Fragment>
    <h1>I am a Header.</h1>
    <h1>I am a Header too.</h1>
  </React.Fragment>
);

// Elements must be closed
const myElement = <input type="text" />;
