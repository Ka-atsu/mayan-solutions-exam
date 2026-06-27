const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  getTasks(search = "", status = "all") {
    return request(
      `/tasks?search=${encodeURIComponent(search)}&status=${status}`,
    );
  },

  getTask(id) {
    return request(`/tasks/${id}`);
  },

  createTask(task) {
    return request("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },

  updateTask(id, task) {
    return request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });
  },

  updateStatus(id, status_name) {
    return request(`/tasks/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status_name }),
    });
  },

  deleteTask(id) {
    return request(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
