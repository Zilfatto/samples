import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  state = {
    title: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };

  onChange = (e) => {
    this.setState({ title: e.target.value });
  };

  render() {
    return (
      <form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add Todo ..."
          style={inputStyle}
          value={this.state.title}
          onChange={this.onChange}
        />
        <button type="submit" style={btnStyle}>
          Add
        </button>
      </form>
    );
  }
}

const inputStyle = {
  flex: '10',
  padding: '8px',
  border: '1px solid black',
  borderRight: 'none'
};
const btnStyle = {
  flex: '1',
  padding: '8px',
  color: 'yellow',
  backgroundColor: 'black',
  border: '1px solid #2299dd'
};

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;
