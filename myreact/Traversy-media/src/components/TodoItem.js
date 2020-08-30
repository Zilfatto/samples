import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './todo-item.module.css';

class TodoItem extends Component {
  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()} className={styles['todo-item']}>
        <p>
          <input
            type="checkbox"
            onChange={() => {
              this.props.toggleComplete(id);
            }}
          />
          {title}
          <button
            type="button"
            className={styles.btn}
            onClick={this.props.delTodo.bind(this, id)}
          >
            &times;
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;
