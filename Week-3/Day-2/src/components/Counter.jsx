import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="section">
      <h2>1. Interactive Counter Component</h2>
      <p>Current Count: <strong>{count}</strong></p>
      
      {/* Event handling with state updates */}
      <button onClick={() => setCount(count + 1)}>Increment (+1)</button>
      <button onClick={() => setCount(count - 1)}>Decrement (-1)</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;