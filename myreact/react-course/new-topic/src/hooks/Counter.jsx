import React, { useState, Fragment } from 'react';

// "useState" hook
function Counter(props) {
  // const array = useState(0);
  // const count = array[0]; // this.state.count
  // const setState = array[1]; // this.setState()
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <Fragment>
      <input type="text" onChange={e => setName(e.target.value)} />
      <div>{name} has clicked {count} times!</div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </Fragment>
  );
}

export default Counter;