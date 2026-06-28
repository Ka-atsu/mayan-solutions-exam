import { useEffect, useState } from "react";
import { api } from "../services/api";

// Custom hook to manage task state and actions (CRUD)
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetches tasks from the API based on current search and filters
  async function loadTasks() {
    try {
      setLoading(true);
      // Fetch everything (or fetch with filters if your backend supports them)
      const data = await api.getTasks(search, "all");

      // Apply Client-Side Filtering
      let filteredData = data;

      if (statusFilter === "active") {
        // Active = Pending OR In Progress
        filteredData = data.filter(
          (t) => t.status_name === "pending" || t.status_name === "in_progress",
        );
      } else if (statusFilter === "inactive") {
        // Inactive = Completed
        filteredData = data.filter((t) => t.status_name === "completed");
      } else if (statusFilter !== "all") {
        filteredData = data.filter((t) => t.status_name === statusFilter);
      }

      setTasks(filteredData);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [search, statusFilter]);

  // Automatically reload tasks whenever the search text or status filter changes
  useEffect(() => {
    loadTasks();
  }, [search, statusFilter]);

  // Create a task and refresh the list
  async function createTask(task) {
    try {
      await api.createTask(task);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Update a task's text fields and refresh the list
  async function updateTask(id, task) {
    try {
      await api.updateTask(id, task);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a task and refresh the list
  async function deleteTask(id) {
    try {
      await api.deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Update a task's status and refresh the list
  async function updateStatus(id, status) {
    try {
      await api.updateStatus(id, status);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return {
    tasks,
    loading,
    error,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
  };
}
