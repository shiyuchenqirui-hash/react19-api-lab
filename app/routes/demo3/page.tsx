import { useOptimistic } from "react";

export default function Demo1() {
  const [count, addOptimistic] = useOptimistic(
    0,
    (state, newCount: number) => newCount
  );

  const handleIncrement = async () => {
    addOptimistic(count + 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="demo-container">
      <h2>Demo 1 - React 19 Hooks</h2>
      <div className="demo-content">
        <p>Current Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </div>
  );
}
