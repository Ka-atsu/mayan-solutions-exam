import { useState } from "react";
import TaskForm from "./TaskForm";

const STATUS_OPTIONS = ["pending", "in_progress", "completed"];

export default function TaskItem({ task, onUpdate, onDelete, onStatusChange }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <TaskForm
        initialData={task}
        onSubmit={(data) => {
          onUpdate(task.id, data);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description || "No description."}</p>

      <p>
        <strong>Status:</strong> {task.status_name}
      </p>

      <select
        value={task.status_name}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status.replace("_", " ")}
          </option>
        ))}
      </select>

      <div>
        <button onClick={() => setEditing(true)}>Edit</button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
