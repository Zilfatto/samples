import React, { Component } from 'react';

export default class Comp extends Component {
  state = {
    count: 1
  };

  constructor() {
    super();
    this.state.count = 10;
  }

  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}
