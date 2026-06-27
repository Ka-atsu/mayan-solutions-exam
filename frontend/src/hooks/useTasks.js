import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadTasks() {
    try {
      setLoading(true);

      const data = await api.getTasks(search, statusFilter);

      setTasks(data);

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

  async function createTask(task) {
    try {
      await api.createTask(task);

      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateTask(id, task) {
    try {
      await api.updateTask(id, task);

      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      await api.deleteTask(id);

      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

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
