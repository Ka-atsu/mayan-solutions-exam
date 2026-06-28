const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to handle all HTTP requests to the backend
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options, // Merges custom settings like method and body
  });

  // If the server returns an error code, throw it with the server's message
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong.");
  }

  // If the server returns a 204 status, it means there is no data to read
  if (response.status === 204) {
    return null;
  }

  // Convert the response data into a JavaScript object
  return response.json();
}

export const api = {
  // Get all tasks (supports matching search text and status filters)
  getTasks(search = "", status = "all") {
    return request(
      `/tasks?search=${encodeURIComponent(search)}&status=${status}`,
    );
  },

  // Get a single task by its ID
  getTask(id) {
    return request(`/tasks/${id}`);
  },

  // Create a new task
  createTask(task) {
    return request("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },

  // Update a task's text fields (title and description)
  updateTask(id, task) {
    return request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });
  },

  // Change only the status of a task
  updateStatus(id, status_name) {
    return request(`/tasks/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status_name }),
    });
  },

  // Remove a task from the database by its ID
  deleteTask(id) {
    return request(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
