import { useEffect, useState } from "react";

/**
 * SearchBar Component
 * Allows users to search for tasks.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Initial search text.
 * @param {(value: string) => void} props.onSearch - Runs when the search text changes.
 */
export default function SearchBar({ value, onSearch }) {
  const [input, setInput] = useState(value);

  // Wait 300ms before searching to avoid searching on every keystroke.
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
