// List of allowed statuses for a task
const VALID_STATUSES = ["pending", "in_progress", "completed"];

// Checks if the task has a valid title before creating it
export function validateCreateTask(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Task title is required.",
    });
  }

  next();
}

// Checks if the new title is valid before updating a task
export function validateUpdateTask(req, res, next) {
  const { title } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      message: "Task title cannot be empty.",
    });
  }

  next();
}

// Checks if the status exists and matches one of the allowed options
export function validateStatus(req, res, next) {
  const { status_name } = req.body;

  if (!status_name) {
    return res.status(400).json({
      message: "Status is required.",
    });
  }

  if (!VALID_STATUSES.includes(status_name)) {
    return res.status(400).json({
      message: "Invalid status.",
    });
  }

  next();
}
