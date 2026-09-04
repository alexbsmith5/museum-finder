import { useState } from "react";

const Input = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <h1>Test</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="type here..."
      />
      <p>{input}</p>
    </>
  );
};

export default Input;
