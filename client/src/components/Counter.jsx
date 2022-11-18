import React, {useState} from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }

  return <>
    <h3>{count}</h3>
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
  </>
};

export default Counter;