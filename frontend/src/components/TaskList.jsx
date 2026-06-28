import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

/**
 * TaskList Component
 * Displays a list of tasks and handles loading, error, empty states, and pagination.
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages needed
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  // Auto-adjust the page if items get deleted or filtered and the current page becomes empty
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks.length, currentPage, totalPages]);

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

  // Slice the tasks array to get only the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="task-list-container">
      <div className="task-items">
        {currentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Pagination Controls - Only show if there is more than 1 page */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
