  import { useEffect, useState } from "react";

  /**
   * TaskForm Component
   * Used to create or edit a task.
   *
   * @param {Object} props - Component props.
   * @param {(task: Object) => void} props.onSubmit - Runs when the form is submitted.
   * @param {Object|null} props.initialData - Task data when editing.
   * @param {() => void} props.onCancel - Runs when editing is canceled.
   */
  export default function TaskForm({ onSubmit, initialData = null, onCancel }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    // Fill the form when editing an existing task.
    useEffect(() => {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description || "");
      }
    }, [initialData]);

    function handleSubmit(e) {
      e.preventDefault();

      // Require a task title before submitting.
      if (!title.trim()) {
        setError("Task title is required.");
        return;
      }

      setError("");

      onSubmit({
        title: title.trim(),
        description: description.trim(),
      });

      // Clear the form after adding a new task.
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
