import React, { Component } from 'react';

class MyForm extends Component {
  render() {
    return (
      <form>
        <h1>Hello</h1>
        <p>Enter your name:</p>
        <input type="text" />
      </form>
    );
  }
}

// Handling forms
// In HTML, form data is usually handled by the DOM.
// In React, form data is usually handled by the components.
// When the data is handled by the components, all the data is stored in the component state.
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  render() {
    return (
      <form>
        <h1>Hello {this.state.username}</h1>
        <p>Enter your name:</p>
        <input type="text" onChange={this.myChangeHandler} />
      </form>
    );
  }
}
// Note: You must initialize the state in the constructor method before you can use it.
//       You get access to the field value by using the event.target.value syntax.

// Conditional rendering
// If you do not want to display the h1 element until the user has done any input, you can add an if statement.
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  render() {
    let header = '';
    if (this.state.username) {
      header = <h1>Hello {this.state.username}</h1>;
    }
    return (
      <form>
        {header}
        <p>Enter your name:</p>
        <input type="text" onChange={this.myChangeHandler} />
      </form>
    );
  }
}

// Submiting forms
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert(`You are submitting ${this.state.username}`);
  };
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username}</h1>
        <p>Enter your name, and submit:</p>
        <input type="text" onChange={this.myChangeHandler} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Multiple input fields
// You can control the values of more than one input field by adding a name attribute to each element.
// When you initialize the state in the constructor, use the field names.
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
  }
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <form>
        <h1>
          Hello {this.state.username} {this.state.age}
        </h1>
        <p>Enter your name:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Enter your age:</p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
      </form>
    );
  }
}

// Validating form input
// You can validate form input when the user is typing or you can wait until the form gets submitted.
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
  }
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'age' && !Number(val)) {
      alert('Your age must be a number');
    }
    this.setState({ [name]: value });
  };
  render() {
    return (
      <form>
        <h1>
          Hello {this.state.username} {this.state.age}
        </h1>
        <p>Enter your name:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Enter your age:</p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
      </form>
    );
  }
}
// Here the validation is done when the form gets submitted instead of when you write in the field.
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age = null
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let age = this.state.age;
    if (!Number(age)) {
      alert('Your age must be a number');
    }
  }
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter your name:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Enter your age:</p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// Adding error message
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
      errorMessage: ''
    };
  }
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let error = '';
    if (name === 'age')  {
      if (value !== '' && !Number(value)) {
        error = <strong>Your age must be a number</strong>;
      }
    }
    this.setState({errorMessage: error});
    this.setState({[name]: value});
  }
  render() {
    return (
      <form>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter your name:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Enter your age:</p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
        {this.state.errorMessage}
      </form>
    );
  }
}


// Textarea
// The textarea element in React is slightly different from ordinary HTML.
// In HTML the value of a textarea was the text between the start tag <textarea> and
// the end tag </textarea>, in React the value of a textarea is placed in a value attribute:
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'The content of a textarea goes in the value attribute'
    };
  }
  render() {
    return (
      <form>
        <textarea value={this.state.description} />
      </form>
    );
  }
}

// Select
// A drop down list, or a select box, in React is also a bit different from HTML.
// in HTML, the selected value in the drop down list was defined with the selected attribute:
<select>
  <option value="Ford">Ford</option>
  <option value="Volvo">Volvo</option>
  <option value="Fiat">Fiat</option>
</select>
// In React, the selected value is defined with a value attribute on the select tag:
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCar: 'Volvo'
    };
  }
  render() {
    return (
      <form>
        <select value={this.state.myCar}>
          <option value="Ford">Ford</option>
          <option value="Volvo">Volvo</option>
          <option value="Fiat">Fiat</option>
        </select>
      </form>
    );
  }
}