import React, { useState, useEffect, Fragment } from 'react';
// import useDocumentTitle from './useDocumentTitle';

// "useEffect" hook
function Counter(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `${name} has clicked ${count} times!`;
    console.log("Mounted");
    return () => {
      console.log('Clean up');
    }
  }, [name, count]);

  // From another module
  // useDocumentTitle(`${name} has clicked ${count} times!`);

  return (
    <Fragment>
      <input type="text" onChange={e => setName(e.target.value)} />
      <div>{name} has clicked {count} times!</div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </Fragment>
  );
}

export default Counter;