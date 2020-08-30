import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/todos?_limit=10').then(
      (response) => {
        response.json().then((data) => {
          this.setState({ todos: data });
        });
      }
    );
  }

  // Toggle complete
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = (id) => {
    fetch(`http://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      this.setState({
        todos: this.state.todos.filter((todo) => todo.id !== id)
      });
    });
  };

  // Add Todo
  addTodo = (title) => {
    fetch('http://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, completed: false })
    }).then((response) => {
      response.json().then((newTodo) => {
        this.setState({
          todos: [...this.state.todos, newTodo]
        });
      });
    });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  toggleComplete={this.toggleComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
