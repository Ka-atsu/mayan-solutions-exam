import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setError("");

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    // Clear form after creating a task
    if (!initialData) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Task" : "New Task"}</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button type="submit">{initialData ? "Update Task" : "Add Task"}</button>

      {initialData && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
