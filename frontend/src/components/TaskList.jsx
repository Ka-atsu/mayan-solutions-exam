import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  loading,
  error,
  onUpdate,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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
