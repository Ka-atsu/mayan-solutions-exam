import TaskItem from "./TaskItem";

/**
 * TaskList Component
 * Displays a list of tasks and handles loading, error, and empty states.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.tasks - List of tasks to display.
 * @param {boolean} props.loading - Indicates whether tasks are being loaded.
 * @param {string} props.error - Error message to display.
 * @param {(id: number, data: Object) => void} props.onUpdate - Updates a task.
 * @param {(id: number) => void} props.onDelete - Deletes a task.
 * @param {(id: number, status: string) => void} props.onStatusChange - Updates a task's status.
 */
export default function TaskList({
  tasks,
  loading,
  error,
  onUpdate,
  onDelete,
  onStatusChange,
}) {
  // Show a loading message while tasks are being fetched.
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Show an error message if something goes wrong.
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Show a message when there are no tasks.
  if (tasks.length === 0) {
    return <p className="empty">No tasks found.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
