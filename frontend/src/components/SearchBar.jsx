import { useEffect, useState } from "react";

export default function SearchBar({ value, onSearch }) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
