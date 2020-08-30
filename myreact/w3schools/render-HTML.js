import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<p>Hello World!</p>, document.getElementById('root'));

// The HTML code
const myElement = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);

ReactDOM.render(myElement, document.getElementById('root'));
